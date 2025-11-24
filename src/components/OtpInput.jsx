import React, { useRef, useState } from 'react'

export default function OtpInput() {
    const TOTAL_DIGITS = 5

    const [otp, setOtp] = useState(Array(TOTAL_DIGITS).fill(""))
    const inputRefs = useRef([])

    const handleChange = (index, e) => {
        const value = e.target.value
        
        // Only allow single digit
        if (value.length > 1) return

        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)

        // Auto-focus next input
        if (value && index < TOTAL_DIGITS - 1) {
            inputRefs.current[index + 1]?.focus()
        }
    }

    const handleKeyDown = (index, e) => {
        // Focus previous input on backspace
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus()
        }
    }


    const handlePaste = (e) => {
        e.preventDefault()
        const pastedData = e.clipboardData.getData('text').slice(0, TOTAL_DIGITS)
        const newOtp = pastedData.split('').concat(Array(TOTAL_DIGITS).fill("")).slice(0, TOTAL_DIGITS)
        setOtp(newOtp)
        
        // Focus last filled input or next empty
        const nextIndex = Math.min(pastedData.length, TOTAL_DIGITS - 1)
        inputRefs.current[nextIndex]?.focus()
    }

  return (

    <div className='flex justify-center '>

        {
            otp?.map((item,index)=> {
                return <input key={index} value={item} type="text" className='input-field' 
                   inputMode="numeric"
                maxLength={1}
                onChange={(e)=> handleChange(index,e)}
                ref={(element) => inputRefs.current[index] = element}
                onKeyDown={(e)=> handleKeyDown(index,e)}
                onPaste={handlePaste}
                />
            })
        }

        

    </div>
  )
}
