# AI Hub Web UI
AI Hub Web UI is the open source AI tools directory build by [AI Tools Directory](https://ai-hub.tools). The project aims to help everyone build their own AI Tools Directory easily. You can fork the project and deploy to vercel by one click and update your own ai tools by the dataList in the project.

English | [简体中文](https://github.com/wys1010/navi-ai-webui/blob/main/README.zh-CN.md)

## Link Me

You can contact me at Twitter: https://x.com/wqs1010


## Features
- Internationalization
- SEO friendly (with i18n)
- sitemap.xml (dynamic with i18n)
- Ship fast
- NEXT 14 with app route (react server component)
- Supabase serverless database



## Quick Start

### Deploy on Vercel **(Don't forget to setup env)**
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fwys1010%2Fnavi-ai-webui.git&env=NEXT_PUBLIC_SITE_URL,GOOGLE_TRACKING_ID,GOOGLE_ADSENSE_URL,CONTACT_US_EMAIL,NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY&project-name=navi-ai)

## Runs on local
### install
- node
- nvm
- pnpm

### setup
#### (1) clone this project
```sh
git clone https://github.com/wys1010/navi-ai-webui.git
```

#### (2) signup a account on supabase then create a project
[https://supabase.com](https://supabase.com)

#### (3) setup env
- root folder, create `.env.local` file and fill with values, for example:
```sh
# your domain
NEXT_PUBLIC_SITE_URL="https://ai-hub.tools"

# google tracking id and adsense URL
GOOGLE_TRACKING_ID="G-XXXXXXX"
GOOGLE_ADSENSE_URL="https://xxxx.googlesyndication.com/xxxxx/xxxxx"

# Footer contact email
CONTACT_US_EMAIL="contact@ai-hub.tools"

# your supabase database url and key
NEXT_PUBLIC_SUPABASE_URL="https://xxxyyyzzz.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="XXX.YYY.ZZZ"
```
#### (4) runs on dev mode
switch to the particular node version
```sh
nvm use
```
install packages
```sh 
pnpm i 
```
run on dev mode
```sh
pnpm dev
```

## How to upate your content?
### update "home" or "explore" page (`/` or `/explore`)
```sh
lib/data.ts -> dataList
```

### update detail page (`/ai/website-name`)
- PS: `detail` supports markdown
```sh
lib/data.ts -> detailList
```
### submit website and read it from database
1. runs the website and then go to `/submit` page
2. input the values and then submit the form
3. open and check your supabase project

## Wanna submit your website on ai-hub.tools?
### Wanna add you website to our `/startup` page?
- open an issue here: [AI-HUB](https://github.com/wys1010/navi-ai-webui/issues)
- email us: contact@ai-hub.tools

## Links to our products
### TAP4-AI-Directory
The Collection for the AI tools all over the world. | Collect free ChatGPT mirrors, alternatives,prompt, other AI tools, etc. For more, please visit: [AI HUB](https://ai-hub.tools)

### How to get your first users for startup at the website list
Here is the website list for submit your product to get users. Please visit [StartUp Your Product List](https://github.com/wys1010/navi-ai-webui/blob/main/Startup-Your-Product-List.md)

### GPT-4o in OpenAI
The amazing new feature released in 2024.05.14. GPT-4o is coming, let's chat with her. Please [GPT-4o](https://openai.com/index/hello-gpt-4o/)

### The Tattoo AI Generator and Design
Tattao AI Design is a tattoo ai generator and design for the tattoo fans. If you are interested with it, visit [Tattoo AI Design](https://tattooai.design)

### Anime Girl Studio -- AI Anime Girl Generator and Chat
Anime Girl Studio is the ai anime girl generator and chat product. You can generate what you like and chat with the AI anime girl, please visit [Anime Girl Studio](https://animegirl.studio)

## Other open source
### Website content crawler code
visit: [wys1010/navi-ai-webui](https://github.com/wys1010/navi-ai-webui)

## LICENSE
MIT
