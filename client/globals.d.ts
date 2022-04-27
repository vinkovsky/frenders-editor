import React from 'react'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      outline: any
      transformControls: any
      orbitControls: any
    }
  }
}

declare module 'yup' {
  interface StringSchema {
    verifyNameProject(message: string): StringSchema
  }
}
