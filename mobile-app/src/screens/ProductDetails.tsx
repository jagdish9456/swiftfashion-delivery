import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Header } from '../components/layout/Header';
import { ProductImageCarousel } from '../components/product/ProductImageCarousel';
import { ProductInfo } from '../components/product/ProductInfo';
import { Check } from 'lucide-react-native';

const mockProduct = {
  name: "Premium Cotton T-Shirt",
  price: 29.99,
  originalPrice: 49.99,
  discount: "40% off",
  rating: 4.5,
  ratingCount: 128,
  images: [
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500",
  ],
  details: {
    color: "Pink",
    length: "Regular",
    type: "Casual",
    sleeve: "Full Sleeve",
  },
  description: "Slip into this trendy and attractive casual shirt and look stylish effortlessly. Made with premium cotton to accentuate any body type, it will give you that extra oomph and make you stand out wherever you are.",
};

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
          <View style={styles.sizeContainer}>
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
          <View style={styles.colorContainer}>
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
                  <Check size={20} color="#fff" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Product Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PRODUCT DETAILS</Text>
          <View style={styles.detailsContainer}>
            {Object.entries(mockProduct.details).map(([key, value]) => (
              <View key={key} style={styles.detailRow}>
                <Text style={styles.detailKey}>{key}</Text>
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
              : `${mockProduct.description.slice(0, 150)}...`}
          </Text>
          <TouchableOpacity
            onPress={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
          >
            <Text style={styles.viewMore}>
              {isDescriptionExpanded ? "View Less" : "View More"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Buttons */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.addToBagButton}>
          <Text style={styles.addToBagText}>ADD TO BAG</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buyNowButton}>
          <Text style={styles.buyNowText}>BUY NOW</Text>
        </TouchableOpacity>
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
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
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
  },
  sizeChart: {
    color: '#9b87f5',
    fontSize: 14,
  },
  sizeTip: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  sizeContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  sizeButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  selectedSizeButton: {
    backgroundColor: '#9b87f5',
    borderColor: '#9b87f5',
  },
  sizeButtonText: {
    fontSize: 14,
    color: '#000',
  },
  selectedSizeButtonText: {
    color: '#fff',
  },
  colorContainer: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 12,
  },
  colorButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsContainer: {
    marginTop: 12,
  },
  detailRow: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  detailKey: {
    width: 100,
    color: '#666',
  },
  detailValue: {
    flex: 1,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#666',
    marginTop: 12,
  },
  viewMore: {
    color: '#9b87f5',
    marginTop: 8,
  },
  bottomButtons: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    gap: 16,
  },
  addToBagButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#9b87f5',
    alignItems: 'center',
  },
  addToBagText: {
    color: '#9b87f5',
    fontWeight: '600',
  },
  buyNowButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 4,
    backgroundColor: '#ef4444',
    alignItems: 'center',
  },
  buyNowText: {
    color: '#fff',
    fontWeight: '600',
  },
});