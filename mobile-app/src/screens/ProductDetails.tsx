import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Header } from '../components/layout/Header';
import { ProductImageCarousel } from '../components/product/ProductImageCarousel';
import { ProductInfo } from '../components/product/ProductInfo';
import { SimilarProducts } from '../components/product/SimilarProducts';
import { Button } from '../components/ui/button';
import { Check } from 'lucide-react-native';

const mockProduct = {
  name: "Premium Cotton T-Shirt",
  price: 29.99,
  originalPrice: 49.99,
  discount: "40% off",
  rating: 4.5,
  ratingCount: 128,
  images: [
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    "https://images.unsplash.com/photo-1576566588028-4147f3842f27",
  ],
  details: {
    color: "Pink",
    length: "Regular",
    type: "Casual",
    sleeve: "Full Sleeve",
  },
  description: "Slip into this trendy and attractive casual shirt and look stylish effortlessly.",
};

const similarProducts = [
  {
    id: "1",
    name: "Classic Linen Shirt",
    price: 36,
    originalPrice: 60,
    discount: "60% off",
    image: "https://images.unsplash.com/photo-1603252109303-2751441dd157",
  },
  {
    id: "2",
    name: "Slim Fit Oxford Shirt",
    price: 19.9,
    originalPrice: 57,
    discount: "65% off",
    image: "https://images.unsplash.com/photo-1604695573706-53170668f6a6",
  },
];

const brandProducts = [
  {
    id: "3",
    name: "StyleCraft Premium Polo",
    price: 42,
    originalPrice: 70,
    discount: "40% off",
    image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99",
  },
  {
    id: "4",
    name: "StyleCraft Summer T-Shirt",
    price: 24.9,
    originalPrice: 49.9,
    discount: "50% off",
    image: "https://images.unsplash.com/photo-1562157873-818bc0726f68",
  },
];

export const ProductDetails = () => {
  const [selectedSize, setSelectedSize] = useState("S");
  const [selectedColor, setSelectedColor] = useState("blue");
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  return (
    <View style={styles.container}>
      <Header showBack title="Product Details" />
      <ScrollView style={styles.content}>
        <ProductImageCarousel images={mockProduct.images} name={mockProduct.name} />
        <ProductInfo {...mockProduct} />
        
        {/* Size Selection */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>SIZE</Text>
            <TouchableOpacity>
              <Text style={styles.sizeChart}>SIZE CHART</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.sizeTip}>
            Tip: For the best fit, buy one size larger than your usual size.
          </Text>
          <View style={styles.sizeButtons}>
            {["XS", "S", "M", "L"].map((size) => (
              <TouchableOpacity
                key={size}
                style={[
                  styles.sizeButton,
                  selectedSize === size && styles.selectedSizeButton,
                ]}
                onPress={() => setSelectedSize(size)}
              >
                <Text
                  style={[
                    styles.sizeButtonText,
                    selectedSize === size && styles.selectedSizeButtonText,
                  ]}
                >
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Color Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>COLOR</Text>
          <View style={styles.colorButtons}>
            {[
              { id: "black", color: "#000" },
              { id: "red", color: "#ef4444" },
              { id: "blue", color: "#3b82f6" },
            ].map(({ id, color }) => (
              <TouchableOpacity
                key={id}
                style={[styles.colorButton, { backgroundColor: color }]}
                onPress={() => setSelectedColor(id)}
              >
                {selectedColor === id && (
                  <Check color="#fff" size={20} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Product Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PRODUCT DETAILS</Text>
          <View style={styles.details}>
            {Object.entries(mockProduct.details).map(([key, value]) => (
              <View key={key} style={styles.detailRow}>
                <Text style={styles.detailLabel}>{key}</Text>
                <Text style={styles.detailValue}>{value}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Product Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PRODUCT DESCRIPTION</Text>
          <Text style={styles.description}>
            {isDescriptionExpanded
              ? mockProduct.description
              : `${mockProduct.description.slice(0, 100)}...`}
          </Text>
          <TouchableOpacity
            onPress={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
          >
            <Text style={styles.viewMore}>
              {isDescriptionExpanded ? "View Less" : "View More"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Similar Products */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SIMILAR PRODUCTS</Text>
          <SimilarProducts products={similarProducts} />
        </View>

        {/* More from Brand */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>MORE FROM STYLECRAFT</Text>
          <SimilarProducts products={brandProducts} />
        </View>
      </ScrollView>

      {/* Bottom Buttons */}
      <View style={styles.bottomButtons}>
        <Button
          variant="outline"
          style={styles.addToBagButton}
          onPress={() => {}}
        >
          ADD TO BAG
        </Button>
        <Button style={styles.buyNowButton} onPress={() => {}}>
          BUY NOW
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    paddingBottom: 80,
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  sizeChart: {
    color: '#10B981',
    fontSize: 14,
    fontWeight: '500',
  },
  sizeTip: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  sizeButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  sizeButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    alignItems: 'center',
  },
  selectedSizeButton: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  sizeButtonText: {
    fontSize: 14,
    color: '#333',
  },
  selectedSizeButtonText: {
    color: '#fff',
  },
  colorButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  colorButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  details: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
  },
  detailLabel: {
    width: 100,
    fontSize: 14,
    color: '#666',
    textTransform: 'capitalize',
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  viewMore: {
    color: '#10B981',
    fontSize: 14,
    fontWeight: '500',
    marginTop: 8,
  },
  bottomButtons: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    gap: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f1f1f1',
  },
  addToBagButton: {
    flex: 1,
    borderColor: '#10B981',
  },
  buyNowButton: {
    flex: 1,
    backgroundColor: '#ef4444',
  },
});