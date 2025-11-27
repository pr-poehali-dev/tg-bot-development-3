import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Video {
  id: number;
  title: string;
  price: number;
  duration: string;
  category: string;
  thumbnail: string;
}

interface CartItem extends Video {
  quantity: number;
}

const mockVideos: Video[] = [
  {
    id: 1,
    title: 'Основы видеомонтажа',
    price: 1299,
    duration: '2:30:00',
    category: 'Обучение',
    thumbnail: 'https://cdn.poehali.dev/projects/74c60f06-1167-4b5f-a848-02c17ffaba7d/files/2ad0f2c3-8133-4a22-bb8e-8c858752769c.jpg'
  },
  {
    id: 2,
    title: 'Креативная съемка',
    price: 1999,
    duration: '1:45:00',
    category: 'Мастер-класс',
    thumbnail: 'https://cdn.poehali.dev/projects/74c60f06-1167-4b5f-a848-02c17ffaba7d/files/2ad0f2c3-8133-4a22-bb8e-8c858752769c.jpg'
  },
  {
    id: 3,
    title: 'Цветокоррекция Pro',
    price: 2499,
    duration: '3:15:00',
    category: 'Профессионал',
    thumbnail: 'https://cdn.poehali.dev/projects/74c60f06-1167-4b5f-a848-02c17ffaba7d/files/2ad0f2c3-8133-4a22-bb8e-8c858752769c.jpg'
  },
  {
    id: 4,
    title: 'Монтаж для блогеров',
    price: 999,
    duration: '1:20:00',
    category: 'Обучение',
    thumbnail: 'https://cdn.poehali.dev/projects/74c60f06-1167-4b5f-a848-02c17ffaba7d/files/2ad0f2c3-8133-4a22-bb8e-8c858752769c.jpg'
  },
  {
    id: 5,
    title: 'Звуковой дизайн',
    price: 1499,
    duration: '2:00:00',
    category: 'Мастер-класс',
    thumbnail: 'https://cdn.poehali.dev/projects/74c60f06-1167-4b5f-a848-02c17ffaba7d/files/2ad0f2c3-8133-4a22-bb8e-8c858752769c.jpg'
  },
  {
    id: 6,
    title: 'Анимация текста',
    price: 1799,
    duration: '2:45:00',
    category: 'Профессионал',
    thumbnail: 'https://cdn.poehali.dev/projects/74c60f06-1167-4b5f-a848-02c17ffaba7d/files/2ad0f2c3-8133-4a22-bb8e-8c858752769c.jpg'
  }
];

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeTab, setActiveTab] = useState('catalog');
  const [purchaseHistory] = useState<Video[]>([
    {
      id: 101,
      title: 'Основы композиции',
      price: 1199,
      duration: '1:30:00',
      category: 'Обучение',
      thumbnail: 'https://cdn.poehali.dev/projects/74c60f06-1167-4b5f-a848-02c17ffaba7d/files/2ad0f2c3-8133-4a22-bb8e-8c858752769c.jpg'
    }
  ]);

  const addToCart = (video: Video) => {
    const existingItem = cart.find(item => item.id === video.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === video.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...video, quantity: 1 }]);
    }
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">VideoShop</h1>
          <p className="text-muted-foreground">Магазин обучающего видеоконтента</p>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="catalog" className="flex items-center gap-2">
              <Icon name="Grid3x3" size={18} />
              <span>Каталог</span>
            </TabsTrigger>
            <TabsTrigger value="cart" className="flex items-center gap-2">
              <Icon name="ShoppingCart" size={18} />
              <span>Корзина</span>
              {cart.length > 0 && (
                <Badge variant="default" className="ml-1">{cart.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <Icon name="User" size={18} />
              <span>Профиль</span>
            </TabsTrigger>
            <TabsTrigger value="support" className="flex items-center gap-2">
              <Icon name="MessageCircle" size={18} />
              <span>Поддержка</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="catalog" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockVideos.map((video) => (
                <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="relative aspect-video overflow-hidden bg-muted">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-3 right-3">{video.category}</Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{video.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <Icon name="Clock" size={16} />
                      <span>{video.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">{video.price} ₽</span>
                      <Button 
                        onClick={() => addToCart(video)}
                        size="sm"
                        className="gap-2"
                      >
                        <Icon name="Plus" size={16} />
                        В корзину
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="cart" className="animate-fade-in">
            {cart.length === 0 ? (
              <div className="text-center py-16">
                <Icon name="ShoppingCart" size={64} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">Корзина пуста</h3>
                <p className="text-muted-foreground mb-6">Добавьте видео из каталога</p>
                <Button onClick={() => setActiveTab('catalog')}>
                  Перейти в каталог
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-4 flex items-center gap-4">
                      <img 
                        src={item.thumbnail} 
                        alt={item.title}
                        className="w-24 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.duration}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">{item.price * item.quantity} ₽</p>
                        <p className="text-sm text-muted-foreground">× {item.quantity}</p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Icon name="Trash2" size={18} />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
                
                <Card className="bg-primary/5">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-semibold">Итого:</span>
                      <span className="text-3xl font-bold text-primary">{getTotalPrice()} ₽</span>
                    </div>
                    <Button className="w-full" size="lg">
                      Оформить покупку
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="profile" className="animate-fade-in">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                    <Icon name="User" size={32} className="text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Пользователь</h3>
                    <p className="text-muted-foreground">@videouser</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <Icon name="History" size={20} />
                    История покупок
                  </h4>
                  <div className="space-y-3">
                    {purchaseHistory.map((video) => (
                      <Card key={video.id}>
                        <CardContent className="p-4 flex items-center gap-4">
                          <img 
                            src={video.thumbnail} 
                            alt={video.title}
                            className="w-20 h-12 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium">{video.title}</h4>
                            <p className="text-sm text-muted-foreground">{video.duration}</p>
                          </div>
                          <span className="font-semibold">{video.price} ₽</span>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div className="text-center p-4">
                    <p className="text-3xl font-bold text-primary">{purchaseHistory.length}</p>
                    <p className="text-sm text-muted-foreground">Куплено курсов</p>
                  </div>
                  <div className="text-center p-4">
                    <p className="text-3xl font-bold text-primary">
                      {purchaseHistory.reduce((sum, v) => sum + v.price, 0)} ₽
                    </p>
                    <p className="text-sm text-muted-foreground">Всего потрачено</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="support" className="animate-fade-in">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <Icon name="MessageCircle" size={40} className="text-primary mb-3" />
                    <h3 className="text-xl font-semibold mb-2">Связаться с нами</h3>
                    <p className="text-muted-foreground">
                      Мы всегда готовы помочь вам с любыми вопросами
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <a 
                      href="https://t.me/support" 
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon name="Send" size={20} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Telegram</p>
                        <p className="text-sm text-muted-foreground">@videoshop_support</p>
                      </div>
                    </a>

                    <a 
                      href="mailto:support@videoshop.com" 
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon name="Mail" size={20} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-sm text-muted-foreground">support@videoshop.com</p>
                      </div>
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <Icon name="HelpCircle" size={40} className="text-primary mb-3" />
                    <h3 className="text-xl font-semibold mb-2">Частые вопросы</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium mb-1">Как получить доступ к видео?</p>
                      <p className="text-sm text-muted-foreground">
                        После оплаты ссылка придет в личные сообщения бота
                      </p>
                    </div>
                    <div>
                      <p className="font-medium mb-1">Можно ли вернуть деньги?</p>
                      <p className="text-sm text-muted-foreground">
                        Да, в течение 14 дней с момента покупки
                      </p>
                    </div>
                    <div>
                      <p className="font-medium mb-1">Есть ли скидки?</p>
                      <p className="text-sm text-muted-foreground">
                        Следите за акциями в нашем Telegram-канале
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
