# taglog-web-client

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/taglog-web-client.svg)](https://www.npmjs.com/package/taglog-web-client) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save taglog-web-client
```

## Usage

```tsx
import { useTaglogInit } from 'taglog-web-client'

function TestComponent() {
  const { captureInfo } = useTaglogInit({
    accessKey: '{accessKeyHere}',
    defaultChannel: '{testChannelKey}'
  })

  return (
    <div>
      <Button
        onClick={(e) => {
          captureInfo('Button Event Triggered', e)
        }}
      >
        Test Action
      </Button>
    </div>
  )
}
```

## Embedding on a Web Page

To embed the Taglog script on any web page, you can use the following example. This script dynamically loads the Taglog client from the npm package and initializes it with your access key and default channel.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Taglog Example</title>
    <script>
      ;(function () {
        const script = document.createElement('script')
        script.src =
          'https://unpkg.com/taglog-web-client@latest/dist/taglog-client-web.js'
        script.onload = function () {
          if (window.taglog) {
            window.taglog.taglogInit({
              accessKey: 'your-access-key',
              defaultChannel: 'your-default-channel'
            })
          }
        }
        document.head.appendChild(script)
      })()
    </script>
  </head>
  <body>
    <h1>Taglog Example</h1>
  </body>
</html>
```

Replace `your-access-key` and `your-default-channel` with your actual Taglog access key and default channel.

## License

MIT © [dusanpetkovicdsaga](https://github.com/dusanpetkovicdsaga)
