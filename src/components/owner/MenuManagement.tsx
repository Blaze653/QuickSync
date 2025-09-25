import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X, Upload, Clock, DollarSign } from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  preparationTime: number;
  customizations: string[];
  available: boolean;
}

const MenuManagement: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: '1',
      name: 'Burger Clásica',
      description: 'Carne de res, lechuga, tomate, cebolla y salsa especial',
      price: 8.99,
      image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg',
      category: 'Hamburguesas',
      preparationTime: 15,
      customizations: ['Sin cebolla', 'Carne extra', 'Queso extra', 'Sin pickles'],
      available: true
    },
    {
      id: '2',
      name: 'Papas Fritas',
      description: 'Papas doradas y crujientes con sal marina',
      price: 3.99,
      image: 'https://images.pexels.com/photos/115740/pexels-photo-115740.jpeg',
      category: 'Acompañamientos',
      preparationTime: 10,
      customizations: ['Porción grande', 'Sin sal', 'Con salsa especial'],
      available: true
    }
  ]);

  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState<Partial<MenuItem>>({
    name: '',
    description: '',
    price: 0,
    category: '',
    preparationTime: 15,
    customizations: [],
    available: true
  });

  const categories = ['Hamburguesas', 'Pizzas', 'Ensaladas', 'Bebidas', 'Acompañamientos', 'Postres'];

  const handleSave = () => {
    if (editingItem) {
      setMenuItems(prev => prev.map(item => 
        item.id === editingItem.id ? { ...editingItem } : item
      ));
      setEditingItem(null);
    } else if (showAddForm && formData.name && formData.price) {
      const newItem: MenuItem = {
        id: Date.now().toString(),
        name: formData.name,
        description: formData.description || '',
        price: formData.price,
        image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg',
        category: formData.category || categories[0],
        preparationTime: formData.preparationTime || 15,
        customizations: formData.customizations || [],
        available: formData.available ?? true
      };
      setMenuItems(prev => [...prev, newItem]);
      setShowAddForm(false);
      setFormData({
        name: '',
        description: '',
        price: 0,
        category: '',
        preparationTime: 15,
        customizations: [],
        available: true
      });
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este plato?')) {
      setMenuItems(prev => prev.filter(item => item.id !== id));
    }
  };

  const toggleAvailability = (id: string) => {
    setMenuItems(prev => prev.map(item => 
      item.id === id ? { ...item, available: !item.available } : item
    ));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestión de Menú</h2>
          <p className="text-primary-600">Administra los platos de tu restaurante</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn-primary px-4 py-2 flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Agregar Plato</span>
        </button>
      </div>

      {/* Categories Filter */}
      <div className="card p-6">
        <div className="flex flex-wrap gap-2">
          <button className="px-4 py-2 bg-primary-500 text-white rounded-full text-sm font-medium">
            Todos ({menuItems.length})
          </button>
          {categories.map(category => {
            const count = menuItems.filter(item => item.category === category).length;
            return (
              <button
                key={category}
                className="flex-1 bg-primary-200 hover:bg-primary-300 text-primary-700 py-3 rounded-xl font-semibold transition-colors"
              >
                {category} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map(item => (
          <div key={item.id} className="card overflow-hidden hover:shadow-medium transition-shadow">
            <div className="relative h-48">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              <div className="absolute top-3 right-3">
                <button
                  onClick={() => toggleAvailability(item.id)}
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.available
                      ? 'bg-success-500 text-white'
                      : 'bg-error-500 text-white'
                  }`}
                >
                  {item.available ? 'Disponible' : 'No disponible'}
                </button>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                <span className="text-sm text-primary-500 bg-primary-100 px-2 py-1 rounded-full">
                  {item.category}
                </span>
              </div>

              <p className="text-primary-600 text-sm mb-3 line-clamp-2">{item.description}</p>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center text-success-600">
                    <DollarSign className="h-4 w-4" />
                    <span className="font-bold">{item.price.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center text-primary-500 text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{item.preparationTime}min</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => setEditingItem({ ...item })}
                  className="flex-1 bg-accent-50 hover:bg-accent-100 text-accent-600 py-2 rounded-lg flex items-center justify-center space-x-1 transition-colors"
                >
                  <Edit className="h-4 w-4" />
                  <span>Editar</span>
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="flex-1 bg-error-50 hover:bg-error-100 text-error-600 py-2 rounded-lg flex items-center justify-center space-x-1 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Eliminar</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Form Modal */}
      {(showAddForm || editingItem) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  {editingItem ? 'Editar Plato' : 'Agregar Nuevo Plato'}
                </h3>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingItem(null);
                    setFormData({
                      name: '',
                      description: '',
                      price: 0,
                      category: '',
                      preparationTime: 15,
                      customizations: [],
                      available: true
                    });
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Imagen del plato</label>
                  <div className="border-2 border-dashed border-primary-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors cursor-pointer">
                    <Upload className="h-8 w-8 text-primary-400 mx-auto mb-2" />
                    <p className="text-sm text-primary-600">Haz clic para subir una imagen</p>
                    <p className="text-xs text-primary-500">PNG, JPG hasta 5MB</p>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-primary-700 mb-2">Nombre del plato</label>
                  <input
                    type="text"
                    value={editingItem ? editingItem.name : formData.name}
                    onChange={(e) => editingItem 
                      ? setEditingItem({ ...editingItem, name: e.target.value })
                      : setFormData({ ...formData, name: e.target.value })
                    }
                    className="input-field w-full px-3 py-2"
                    placeholder="Ej: Burger Clásica"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-primary-700 mb-2">Descripción</label>
                  <textarea
                    value={editingItem ? editingItem.description : formData.description}
                    onChange={(e) => editingItem 
                      ? setEditingItem({ ...editingItem, description: e.target.value })
                      : setFormData({ ...formData, description: e.target.value })
                    }
                    className="input-field w-full px-3 py-2 resize-none"
                    rows={3}
                    placeholder="Descripción detallada del plato..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Price */}
                  <div>
                    <label className="block text-sm font-medium text-primary-700 mb-2">Precio ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={editingItem ? editingItem.price : formData.price}
                      onChange={(e) => editingItem 
                        ? setEditingItem({ ...editingItem, price: parseFloat(e.target.value) })
                        : setFormData({ ...formData, price: parseFloat(e.target.value) })
                      }
                      className="input-field w-full px-3 py-2"
                      placeholder="0.00"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-primary-700 mb-2">Categoría</label>
                    <select
                      value={editingItem ? editingItem.category : formData.category}
                      onChange={(e) => editingItem 
                        ? setEditingItem({ ...editingItem, category: e.target.value })
                        : setFormData({ ...formData, category: e.target.value })
                      }
                      className="input-field w-full px-3 py-2"
                    >
                      <option value="">Seleccionar categoría</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Preparation Time */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                  <label className="block text-sm font-medium text-primary-700 mb-2">
                    Tiempo de preparación (minutos)
                  </label>
                  <input
                    type="number"
                    value={editingItem ? editingItem.preparationTime : formData.preparationTime}
                    onChange={(e) => editingItem 
                      ? setEditingItem({ ...editingItem, preparationTime: parseInt(e.target.value) })
                      : setFormData({ ...formData, preparationTime: parseInt(e.target.value) })
                    }
                    className="input-field w-full px-3 py-2"
                    min="1"
                  />
                </div>

                {/* Customizations */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                  <label className="block text-sm font-medium text-primary-700 mb-2">
                    Personalizaciones disponibles
                  </label>
                  <div className="space-y-2">
                    {['Sin cebolla', 'Carne extra', 'Queso extra', 'Sin pickles', 'Porción grande', 'Sin sal'].map(customization => (
                      <label key={customization} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={editingItem 
                            ? editingItem.customizations.includes(customization)
                            : formData.customizations?.includes(customization) || false
                          }
                          onChange={(e) => {
                            if (editingItem) {
                              const newCustomizations = e.target.checked
                                ? [...editingItem.customizations, customization]
                                : editingItem.customizations.filter(c => c !== customization);
                              setEditingItem({ ...editingItem, customizations: newCustomizations });
                            } else {
                              const newCustomizations = e.target.checked
                                ? [...(formData.customizations || []), customization]
                                : (formData.customizations || []).filter(c => c !== customization);
                              setFormData({ ...formData, customizations: newCustomizations });
                            }
                          }}
                          className="rounded border-primary-300 text-primary-500 focus:ring-primary-500"
                        />
                        <span className="text-sm text-primary-700">{customization}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Available */}
                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={editingItem ? editingItem.available : formData.available}
                      onChange={(e) => editingItem 
                        ? setEditingItem({ ...editingItem, available: e.target.checked })
                        : setFormData({ ...formData, available: e.target.checked })
                      }
                      className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Disponible para pedidos</span>
                  </label>
                </div>
              </div>

              <div className="flex space-x-3 mt-8">
                <button
                  onClick={handleSave}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-colors"
                >
                  <Save className="h-5 w-5" />
                  <span>{editingItem ? 'Guardar cambios' : 'Agregar plato'}</span>
                </button>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingItem(null);
                  }}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-semibold transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuManagement;