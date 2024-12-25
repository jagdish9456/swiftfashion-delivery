declare module 'react-native' {
  export * from 'react-native-web';
}

declare module 'react-native-web' {
  import * as ReactNativeWeb from 'react-native-web';
  export = ReactNativeWeb;
}