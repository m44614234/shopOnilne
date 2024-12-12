'use client'

import React from 'react'
import { ConfigProvider } from 'antd'

const theme = {
  token: {
    colorPrimary: '#00b96b',
  },

}

export function Providers({ children }: { children: React.ReactNode }) {
  return <ConfigProvider theme={theme}>{children}</ConfigProvider>
}