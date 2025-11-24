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


  return (

    <div className='flex justify-center '>

        {
            otp?.map((item,index)=> {
                return <input key={index} value={item} type="text" className='input-field' maxLength={1}
                onChange={(e)=> handleChange(index,e)}
                ref={(element) => inputRefs.current[index] = element}
                onKeyDown={(e)=> handleKeyDown(index,e)}
                />
            })
        }

        

    </div>
  )
}
