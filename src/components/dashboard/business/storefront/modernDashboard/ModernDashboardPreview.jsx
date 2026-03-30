import { ModernDashboardRenderer } from './ModernDashboardRenderer';
import { ModernDashboardProvider } from './ModernDashboardContext';

const ModernDashboardPreview = () => {
  return (
    <ModernDashboardProvider>
      <div style={{ width: '1920px', height: '1080px', overflow: 'hidden' }}>
        <ModernDashboardRenderer
          config={{
            businessName: 'FoodiePinoy',
            hero: {
              title: 'Delicious Filipino Cuisine',
              subtitle: 'Fresh & Authentic',
            },
          }}
          products={[
            {
              id: 1,
              name: 'Chicken Adobo',
              price: 250,
              description: 'Classic Filipino chicken braised in soy sauce and vinegar',
              image_url: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
              is_featured: true,
              created_at: '2024-01-01',
            },
            {
              id: 2,
              name: 'Sinigang na Baboy',
              price: 280,
              description: 'Savory and sour pork soup with vegetables',
              image_url: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800',
              is_featured: true,
              created_at: '2024-01-02',
            },
            {
              id: 3,
              name: 'Pancit Canton',
              price: 180,
              description: 'Stir-fried noodles with vegetables and meat',
              image_url: 'https://images.pexels.com/photos/1907244/pexels-photo-1907244.jpeg?auto=compress&cs=tinysrgb&w=800',
              is_featured: false,
              created_at: '2024-01-03',
            },
            {
              id: 4,
              name: 'Lumpia Shanghai',
              price: 150,
              description: 'Crispy Filipino spring rolls',
              image_url: 'https://images.pexels.com/photos/2673353/pexels-photo-2673353.jpeg?auto=compress&cs=tinysrgb&w=800',
              is_featured: false,
              created_at: '2024-01-04',
            },
          ]}
          categories={[
            { id: 'main', name: 'Main Dishes' },
            { id: 'appetizers', name: 'Appetizers' },
            { id: 'desserts', name: 'Desserts' },
          ]}
        />
      </div>
    </ModernDashboardProvider>
  );
};

export default ModernDashboardPreview;
