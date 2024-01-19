'use client'
import React, { createContext, useState } from 'react'

type IsAuthenticatedContextProps = {
    IsAuthenticated: boolean
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}

export const IsAuthenticatedContext = createContext<IsAuthenticatedContextProps | undefined>(undefined)

export const IsAuthenticatedProvider = ({ children }: {children: React.ReactNode}) => {
    const [IsAuthenticated, setIsAuthenticated] = useState(false)

    return (
        <IsAuthenticatedContext.Provider value={{ IsAuthenticated, setIsAuthenticated }}>
            {children}
        </IsAuthenticatedContext.Provider>
    )
}