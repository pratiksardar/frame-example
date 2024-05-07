import { Button, Frog } from 'frog'
import { devtools } from 'frog/dev'
import { serveStatic } from 'frog/serve-static'
import { handle } from 'frog/vercel'

export const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
})

app.frame('/', (c) => {
  const { buttonValue } = c
  let result = '';
  let toggleColor = true;
  let bgColor 
  if (buttonValue === 'TOSS') {
    // toggleColor = !toggleColor;
    result = Math.random() < 0.5 ? 'Heads' : 'Tails'; // Randomly picks "Heads" or "Tails"
    if (result === 'Heads') {
      bgColor = '#34495e';
    }
    else{
      bgColor = '#16a085';

      
    }
    toggleColor = !toggleColor; // Toggle the background color to indicate a toss
  }
  
  // let bgColor = toggleColor ? '#34495e' : '#16a085'; // Alternate between colors on each toss

  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          background: `linear-gradient(to top, ${bgColor}, #CAD0D6)`,
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
          transition: 'background-color 0.5s ease-in-out',
        }}
      >
        <div
          style={{
            color: 'white',
            fontSize: 60,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: 30,
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
            animation: 'fadeIn 0.5s ease-in-out',
          }}
        >
          {result ? `${result.toUpperCase()}!` : 'Click TOSS to flip a coin!'}
        </div>
      </div>
    ),
    intents: [
      <Button value="TOSS">🪙</Button>,
      <Button.Reset>Reset</Button.Reset>,
    ],
  })
})

// CSS for fade-in animation (add to your global styles or inline styles)
/*
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
*/

// @ts-ignore
const isEdgeFunction = typeof EdgeFunction !== 'undefined'
const isProduction = isEdgeFunction || import.meta.env?.MODE !== 'development'
devtools(app, isProduction ? { assetsPath: '/.frog' } : { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
