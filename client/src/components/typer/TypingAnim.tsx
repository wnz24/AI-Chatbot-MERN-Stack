

import { TypeAnimation } from 'react-type-animation';
const TypingAnim = () => {
  return (
    <TypeAnimation
    sequence={[
      '💬 Chat with your AI assistant',
      1000,
      '🚀 Powered by OpenAI technology',
      1000,
      '⏰ Here to help you 24/7',
      1000,
      '❓ Ask me anything!',
      1000
    ]}
    wrapper="span"
    speed={50}
    style={{ fontSize: '2em', display: 'inline-block', color:'white', textShadow: "1px 1px 20px #000"}}
    repeat={Infinity}
  />
  
  )
}

export default TypingAnim
