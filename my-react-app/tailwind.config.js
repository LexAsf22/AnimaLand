module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        blob: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' },
        },
        float: {
          '0%, 100%': { 
            transform: 'translateY(0) translateX(0)',
            opacity: '0'
          },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { 
            transform: 'translateY(-100px) translateX(50px)',
            opacity: '0'
          },
        },
        scaleIn: {
          '0%': { 
            transform: 'scale(0) rotate(0deg)',
            opacity: '0'
          },
          '50%': { transform: 'scale(1.1) rotate(180deg)' },
          '100%': { 
            transform: 'scale(1) rotate(360deg)',
            opacity: '1'
          },
        },
        checkmark: {
          '0%': {
            strokeDasharray: '0, 100',
            strokeDashoffset: '0'
          },
          '100%': {
            strokeDasharray: '100, 0',
            strokeDashoffset: '0'
          },
        },
        ripple: {
          '0%': {
            transform: 'scale(1)',
            opacity: '0.5'
          },
          '100%': {
            transform: 'scale(2)',
            opacity: '0'
          },
        },
        slideUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        loadingBar: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
      },
      animation: {
        'blob': 'blob 7s infinite',
        'fadeIn': 'fadeIn 0.5s ease-in-out',
        'slideIn': 'slideIn 0.4s ease-out',
        'shake': 'shake 0.3s ease-in-out',
        'float': 'float 3s ease-in-out infinite',
        'scaleIn': 'scaleIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'checkmark': 'checkmark 0.6s ease-in-out 0.3s forwards',
        'ripple': 'ripple 1.5s ease-out infinite',
        'slideUp': 'slideUp 0.6s ease-out 0.4s both',
        'loadingBar': 'loadingBar 1.5s ease-out forwards',
      },
    },
  },
  plugins: [],
}