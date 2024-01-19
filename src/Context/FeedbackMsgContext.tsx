'use client'

import FeedBackMsg from '@/app/components/layout/FeedBackMsg'
import { createContext, useEffect, useRef, useState } from 'react'
import { Root, createRoot } from 'react-dom/client'

type FeedbackMsgContextProps = {
    msgData: {
        msg: string,
        status: number
    },
    setMsgData: React.Dispatch<React.SetStateAction<{
        msg: string,
        status: number
    }>>,
    rootRefCurrent: Root | null,
    timeOutRefCurrent: NodeJS.Timeout | null
    // showNotification: any
}

export const FeedbackMsgContext = createContext<FeedbackMsgContextProps>({
    msgData: {
        msg: '',
        status: 0
    },
    setMsgData: () => ({
        msg: '',
        status: 0
    }),
    rootRefCurrent: null,
    timeOutRefCurrent: null
})

export const FeedbackMsgContextProvider = ({children}: {children: React.ReactNode}) => {
    const [msgData, setMsgData] = useState({
        msg: '',
        status: 0
    }) 

    // const msg = msgData.msg
    // const status = msgData.status

    const timeoutRef = useRef<NodeJS.Timeout | null>(null)
    const rootRef = useRef<Root | null>(null)

    useEffect(() => {
        const domNode = document.getElementById('root')
        if (domNode && !rootRefCurrent) {
        rootRef.current = createRoot(domNode)
        }
    }, [])

    const timeOutRefCurrent = timeoutRef.current
    const rootRefCurrent = rootRef.current

    // const showNotification = () => {
    //     const styleName = status === 200 ? 'ok' : 'error'
    
    //     const component = (
    //       <FeedBackMsg
    //         text={msg}
    //         styleName={styleName}
    //       />
    //     )
    //     renderComponent(component)
    
    //     if (timeOutRefCurrent) {
    //       clearTimeout(timeOutRefCurrent)
    //     }

    //     timeOutRefCurrent = setTimeout(() => {
    //       cleanNotification()
    //     }, 5000)
    //   }
    
    // const cleanNotification = () => {
    //     const component = (
    //         <FeedBackMsg
    //         text=""
    //         styleName="hide"
    //         />
    //     )
    //     renderComponent(component)

    //     if (timeOutRefCurrent) {
    //         clearTimeout(timeOutRefCurrent);
    //     }

    //     timeOutRefCurrent = null
    // }
    
    // const renderComponent = (component:React.ReactNode) => {
    //     if (rootRefCurrent) {
    //         rootRefCurrent.render(component)
    //     }
    // }
    
    return (
        <FeedbackMsgContext.Provider value={{ msgData, setMsgData, rootRefCurrent, timeOutRefCurrent }}>
            { children }
        </FeedbackMsgContext.Provider>
    )
}