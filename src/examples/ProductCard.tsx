import { useState } from 'react';
import {
  Button,
  Text,
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogClose,
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  DropdownLabel,
  Slider,
  Tooltip,
} from '@/components';
import { Box, Stack } from '@/components/Layout';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  description: string;
  inStock: boolean;
  category: string;
}

const sampleProduct: Product = {
  id: '1',
  name: 'Wireless Bluetooth Headphones',
  price: 89.99,
  originalPrice: 129.99,
  rating: 4.5,
  reviews: 1247,
  description:
    'Premium wireless headphones with active noise cancellation, 30-hour battery life, and superior sound quality.',
  inStock: true,
  category: 'Electronics',
};

export const ProductCard = () => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [, setSelectedAction] = useState('');
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const handleAddToCart = () => {
    console.log(`Added ${quantity} item(s) to cart`);
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    console.log(`Buying ${quantity} item(s) now`);
    // Simulate purchase flow
  };

  const handleWishlistAction = (action: string) => {
    console.log(`${action} product`);
    setSelectedAction(action);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-sm ${
          i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
        }`}
      >
        ★
      </span>
    ));
  };

  const discountPercentage = sampleProduct.originalPrice
    ? Math.round(
        ((sampleProduct.originalPrice - sampleProduct.price) /
          sampleProduct.originalPrice) *
          100
      )
    : 0;

  return (
    <Box className='w-md mx-auto bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden'>
      {/* Product Image Placeholder */}
      <div className='h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center'>
        <Text emphasis='low' size='sm' align='center'>
          Product Image
        </Text>
      </div>

      <Box className='p-6 w-full'>
        <Stack className='space-y-4'>
          {/* Product Header */}
          <div className='flex w-full justify-between items-center'>
            <div className='flex-1'>
              <Text as='h3' size='lg' weight='semibold' className='mb-1'>
                {sampleProduct.name}
              </Text>
              <Text emphasis='low' size='sm'>
                {sampleProduct.category}
              </Text>
            </div>

            <Dropdown>
              <DropdownTrigger className='w-auto px-2'>
                <svg
                  className='w-5 h-5'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path d='M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z' />
                </svg>
              </DropdownTrigger>
              <DropdownContent align='end' className='w-36'>
                <DropdownLabel>Actions</DropdownLabel>
                <DropdownItem
                  onSelect={() => handleWishlistAction('Add to Wishlist')}
                >
                  Add to Wishlist
                </DropdownItem>
                <DropdownItem
                  onSelect={() => handleWishlistAction('Share Product')}
                >
                  Share Product
                </DropdownItem>
                <DropdownSeparator />
                <DropdownItem onSelect={() => setIsDetailsOpen(true)}>
                  View Details
                </DropdownItem>
                <DropdownItem
                  variant='destructive'
                  onSelect={() => handleWishlistAction('Report Product')}
                >
                  Report Product
                </DropdownItem>
              </DropdownContent>
            </Dropdown>
          </div>

          {/* Rating and Reviews */}
          <div className='flex items-center gap-2'>
            <div className='flex items-center'>
              {renderStars(sampleProduct.rating)}
            </div>
            <Text size='sm' emphasis='low'>
              {sampleProduct.rating} ({sampleProduct.reviews} reviews)
            </Text>
          </div>

          {/* Price */}
          <div className='flex items-center gap-2'>
            <Text size='2xl' weight='bold' className='text-green-600'>
              ${sampleProduct.price}
            </Text>
            {sampleProduct.originalPrice && (
              <>
                <Text size='lg' emphasis='low' className='line-through'>
                  ${sampleProduct.originalPrice}
                </Text>
                <Text
                  size='sm'
                  weight='medium'
                  className='bg-red-100 text-red-700 px-2 py-1 rounded'
                >
                  {discountPercentage}% OFF
                </Text>
              </>
            )}
          </div>

          {/* Stock Status */}
          <div className='flex items-center gap-2'>
            <div
              className={`w-2 h-2 rounded-full ${
                sampleProduct.inStock ? 'bg-green-500' : 'bg-red-500'
              }`}
            />
            <Text
              size='sm'
              weight='medium'
              className={
                sampleProduct.inStock ? 'text-green-700' : 'text-red-700'
              }
            >
              {sampleProduct.inStock ? 'In Stock' : 'Out of Stock'}
            </Text>
          </div>

          {/* Quantity Selector */}
          <div className='w-1/2'>
            <div className='flex items-center gap-2 mb-2'>
              <Text size='sm' weight='medium' className='w-fit'>
                Quantity:
              </Text>
              <Text size='sm' weight='medium' className='text-primary-600'>
                {quantity}
              </Text>
            </div>
            <Slider
              value={quantity}
              onChange={setQuantity}
              min={1}
              max={10}
              step={1}
              aria-label='Product quantity'
              disabled={!sampleProduct.inStock}
            />
          </div>

          {/* Action Buttons */}
          <div className='flex w-full gap-2 justify-between items-center'>
            <Tooltip
              content={
                !sampleProduct.inStock
                  ? 'Product is currently out of stock'
                  : 'Add item to your shopping cart'
              }
            >
              <Button
                variant='primary'
                onClick={handleAddToCart}
                disabled={!sampleProduct.inStock}
                className='w-48'
              >
                {isAddedToCart ? '✓ Added to Cart' : 'Add to Cart'}
              </Button>
            </Tooltip>

            <Button
              variant='outline'
              onClick={handleBuyNow}
              disabled={!sampleProduct.inStock}
              className='w-full'
            >
              Buy Now
            </Button>
          </div>
        </Stack>
      </Box>

      {/* Product Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen} size='lg'>
        <DialogHeader>
          <DialogTitle>{sampleProduct.name}</DialogTitle>
          <DialogClose onClose={() => setIsDetailsOpen(false)} />
        </DialogHeader>
        <DialogContent>
          <Stack className='space-y-4'>
            <div>
              <Text weight='medium' className='mb-2 mr-2'>
                Description:
              </Text>
              <Text emphasis='low' size='sm'>
                {sampleProduct.description}
              </Text>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div className='flex items-center gap-2'>
                <Text weight='medium' size='sm' className='w-fit'>
                  Price:
                </Text>
                <Text size='lg' weight='bold' className='text-green-600'>
                  ${sampleProduct.price}
                </Text>
              </div>
              <div className='flex items-center gap-2'>
                <Text weight='medium' size='sm' className=''>
                  Rating:
                </Text>
                <div className='flex items-center gap-1'>
                  {renderStars(sampleProduct.rating)}
                  <Text size='sm' emphasis='low'>
                    ({sampleProduct.reviews})
                  </Text>
                </div>
              </div>
            </div>

            <div className='flex w-full items-center gap-2'>
              <Text weight='medium' size='sm' className='w-fit'>
                Availability:
              </Text>
              <Text
                size='sm'
                className={
                  sampleProduct.inStock ? 'text-green-700' : 'text-red-700'
                }
              >
                {sampleProduct.inStock
                  ? 'In Stock - Ready to ship'
                  : 'Currently unavailable'}
              </Text>
            </div>
          </Stack>
        </DialogContent>
        <DialogFooter>
          <Button variant='outline' onClick={() => setIsDetailsOpen(false)}>
            Close
          </Button>
          <Button
            variant='primary'
            onClick={handleAddToCart}
            disabled={!sampleProduct.inStock}
          >
            Add to Cart
          </Button>
        </DialogFooter>
      </Dialog>
    </Box>
  );
};
