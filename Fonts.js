import { Platform } from 'react-native';

export const Fonts = Platform.select({
    ios: {
        ProductSans: 'ProductSans-Regular',
        ProductSansBold: 'ProductSans-Bold'
    },
    android: {
        ProductSans: 'Product Sans Regular',
        ProductSansBold: 'Product Sans Bold'
    }
})