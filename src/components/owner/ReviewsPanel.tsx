import React, { useState } from 'react';
import { Star, Filter, Calendar, MessageCircle, ThumbsUp, Flag } from 'lucide-react';

interface Review {
  id: string;
  customerName: string;
  customerImage?: string;
  rating: number;
  comment: string;
  date: string;
  orderId: string;
  items: string[];
  helpful: number;
  response?: {
    text: string;
    date: string;
  };
}

const ReviewsPanel: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: '1',
      customerName: 'María González',
      customerImage: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=100&h=100&fit=crop&crop=face',
      rating: 5,
      comment: 'Excelente servicio y la comida llegó muy rápida. La burger estaba deliciosa y las papas perfectamente doradas. Definitivamente voy a pedir de nuevo.',
      date: '2024-01-15',
      orderId: '1001',
      items: ['Burger Clásica', 'Papas Fritas'],
      helpful: 8,
      response: {
        text: '¡Muchas gracias por tu comentario, María! Nos alegra saber que disfrutaste tu pedido. ¡Esperamos verte pronto!',
        date: '2024-01-15'
      }
    },
    {
      id: '2',
      customerName: 'Carlos Rodríguez',
      customerImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=100&h=100&fit=crop&crop=face',
      rating: 4,
      comment: 'Buena comida en general. La pizza estaba rica pero llegó un poco fría. El tiempo de entrega fue razonable.',
      date: '2024-01-14',
      orderId: '1002',
      items: ['Pizza Margarita'],
      helpful: 5
    },
    {
      id: '3',
      customerName: 'Ana Martínez',
      rating: 3,
      comment: 'La comida estaba bien pero esperaba más por el precio. El delivery se demoró más de lo estimado.',
      date: '2024-01-13',
      orderId: '1003',
      items: ['Ensalada César', 'Bebida'],
      helpful: 2
    },
    {
      id: '4',
      customerName: 'Luis Fernández',
      customerImage: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?w=100&h=100&fit=crop&crop=face',
      rating: 5,
      comment: '¡Increíble! La mejor burger que he probado en mucho tiempo. Ingredientes frescos y excelente preparación. 100% recomendado.',
      date: '2024-01-12',
      orderId: '1004',
      items: ['Burger Clásica', 'Papas Fritas', 'Bebida'],
      helpful: 12
    }
  ]);

  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<'date' | 'rating' | 'helpful'>('date');
  const [respondingTo, setRespondingTo] = useState<string | null>(null);
  const [responseText, setResponseText] = useState('');

  const filteredReviews = reviews
    .filter(review => filterRating === null || review.rating === filterRating)
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'helpful':
          return b.helpful - a.helpful;
        case 'date':
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const totalReviews = reviews.length;

  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length,
    percentage: (reviews.filter(r => r.rating === rating).length / totalReviews) * 100
  }));

  const handleResponse = (reviewId: string) => {
    if (!responseText.trim()) return;

    setReviews(prev => prev.map(review =>
      review.id === reviewId
        ? {
            ...review,
            response: {
              text: responseText,
              date: new Date().toISOString().split('T')[0]
            }
          }
        : review
    ));

    setRespondingTo(null);
    setResponseText('');
  };

  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'sm') => {
    const sizeClass = {
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6'
    }[size];

    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map(star => (
          <Star
            key={star}
            className={`${sizeClass} ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Reseñas y Calificaciones</h2>
        <p className="text-primary-600">Gestiona las opiniones de tus clientes</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Rating Overview */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Calificación General</h3>
          <div className="flex items-center space-x-4 mb-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600">{averageRating.toFixed(1)}</div>
              {renderStars(Math.round(averageRating), 'lg')}
              <p className="text-sm text-primary-600 mt-1">{totalReviews} reseñas</p>
            </div>
            <div className="flex-1 space-y-2">
              {ratingDistribution.map(({ rating, count, percentage }) => (
                <div key={rating} className="flex items-center space-x-2">
                  <span className="text-sm font-medium w-2">{rating}</span>
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <div className="flex-1 bg-primary-200 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-primary-600 w-8">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Response Rate */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Estadísticas de Respuesta</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-primary-600">Reseñas respondidas</span>
              <span className="font-semibold">
                {reviews.filter(r => r.response).length} de {totalReviews}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-primary-600">Tasa de respuesta</span>
              <span className="font-semibold text-success-600">
                {Math.round((reviews.filter(r => r.response).length / totalReviews) * 100)}%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-primary-600">Tiempo promedio de respuesta</span>
              <span className="font-semibold">2 horas</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="card p-6">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilterRating(null)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filterRating === null
                  ? 'bg-primary-500 text-white'
                  : 'bg-primary-100 hover:bg-primary-200 text-primary-700'
              }`}
            >
              Todas
            </button>
            {[5, 4, 3, 2, 1].map(rating => (
              <button
                key={rating}
                onClick={() => setFilterRating(rating)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors flex items-center space-x-1 ${
                  filterRating === rating
                    ? 'bg-primary-500 text-white'
                    : 'bg-primary-100 hover:bg-primary-200 text-primary-700'
                }`}
              >
                <span>{rating}</span>
                <Star className="h-3 w-3 fill-current" />
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-primary-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'rating' | 'helpful')}
              className="input-field px-3 py-1 text-sm"
            >
              <option value="date">Más recientes</option>
              <option value="rating">Mayor calificación</option>
              <option value="helpful">Más útiles</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {filteredReviews.map(review => (
          <div key={review.id} className="card p-6 hover:shadow-medium transition-shadow">
            {/* Review Header */}
            <div className="flex items-start space-x-4 mb-4">
              <div className="w-12 h-12 bg-primary-200 rounded-full overflow-hidden flex-shrink-0">
                {review.customerImage ? (
                  <img
                    src={review.customerImage}
                    alt={review.customerName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-primary-500 font-medium">
                    {review.customerName.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold text-gray-900">{review.customerName}</h4>
                  <div className="flex items-center space-x-2 text-sm text-primary-500">
                    <Calendar className="h-4 w-4" />
                    <span>{review.date}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  {renderStars(review.rating)}
                  <span className="text-sm text-primary-600">
                    Pedido #{review.orderId}
                  </span>
                </div>
                <div className="text-sm text-primary-600">
                  <span>Artículos: </span>
                  {review.items.join(', ')}
                </div>
              </div>
            </div>

            {/* Review Content */}
            <div className="mb-4">
              <p className="text-primary-700 leading-relaxed">{review.comment}</p>
            </div>

            {/* Review Actions */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4 text-sm text-primary-500">
                <button className="flex items-center space-x-1 hover:text-primary-700 transition-colors">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{review.helpful} personas encontraron esto útil</span>
                </button>
                <button className="flex items-center space-x-1 hover:text-primary-700 transition-colors">
                  <Flag className="h-4 w-4" />
                  <span>Reportar</span>
                </button>
              </div>

              {!review.response && (
                <button
                  onClick={() => setRespondingTo(review.id)}
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center space-x-1 transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Responder</span>
                </button>
              )}
            </div>

            {/* Owner Response */}
            {review.response && (
              <div className="bg-primary-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">R</span>
                  </div>
                  <span className="font-medium text-gray-900">Respuesta del restaurante</span>
                  <span className="text-sm text-primary-500">{review.response.date}</span>
                </div>
                <p className="text-primary-700 ml-8">{review.response.text}</p>
              </div>
            )}

            {/* Response Form */}
            {respondingTo === review.id && (
              <div className="mt-4 p-4 bg-primary-50 rounded-lg">
                <h5 className="font-medium text-gray-900 mb-2">Responder a {review.customerName}</h5>
                <textarea
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  placeholder="Escribe tu respuesta..."
                  className="input-field w-full px-3 py-2 resize-none"
                  rows={3}
                />
                <div className="flex space-x-2 mt-3">
                  <button
                    onClick={() => handleResponse(review.id)}
                    className="btn-primary px-4 py-2 text-sm"
                  >
                    Publicar respuesta
                  </button>
                  <button
                    onClick={() => {
                      setRespondingTo(null);
                      setResponseText('');
                    }}
                    className="bg-primary-200 hover:bg-primary-300 text-primary-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredReviews.length === 0 && (
        <div className="text-center py-16">
          <div className="bg-primary-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="h-12 w-12 text-primary-400" />
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            No hay reseñas {filterRating ? `de ${filterRating} estrella${filterRating > 1 ? 's' : ''}` : ''}
          </h3>
          <p className="text-primary-600">
            Las reseñas de tus clientes aparecerán aquí cuando realicen pedidos
          </p>
        </div>
      )}
    </div>
  );
};

export default ReviewsPanel;