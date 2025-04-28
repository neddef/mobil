import { Platform } from 'react-native';

/**
 * Bu hook, bir değerin sadece client tarafında kullanılması için web ve native platformlarına 
 * göre farklı değerler döndürür.
 * @param webValue Web platformu için değer
 * @param nativeValue Native platformlar için değer
 * @returns Platform tipine göre uygun değeri döndürür
 */
export function useClientOnlyValue<T>(webValue: T, nativeValue: T): T {
  return Platform.OS === 'web' ? webValue : nativeValue;
} 