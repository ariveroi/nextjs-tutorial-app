# Getting started with Next JS

Este repositorio es una página web diseñada para ayudar a los usuarios a comenzar con Next.js, un framework de React para construir aplicaciones web.

## Server and Client components

Server and Client Components allow developers to build applications that span the server and client, combining the rich interactivity of client-side apps with the improved performance of traditional server rendering.

### Server Components

All components inside the app directory are React Server Components (RSC) by default, including special files and colocated components. This allows you to automatically adopt Server Components with no extra work, and achieve great performance out of the box.

#### Why Server Components?

Server Components allow developers to better leverage server infrastructure. For example, large dependencies that previously would impact the JavaScript bundle size on the client can instead remain entirely on the server, leading to improved performance.

Server Components make writing a React application feel similar to PHP or Ruby on Rails, but with the power and flexibility of React for templating UI.

When a route is loaded with Next.js, the initial HTML is rendered on the server. This HTML is then progressively enhanced in the browser, allowing the client to take over the application and add interactivity, by asynchronously loading the Next.js and React client-side runtime.

With Server Components, the initial page load is faster, and the client-side JavaScript bundle size is reduced. The base client-side runtime is cacheable and predictable in size, and does not increase as your application grows. Additional JavaScript is only added as client-side interactivity is used in your application through Client Components.

### Client Components

Client Components enable you to add client-side interactivity to your application. In Next.js, they are prerendered on the server and hydrated on the client. You can think of Client Components as how components in the Next.js pages/ directory have always worked.

app/posts/Counter

```
"use client";
import React, { useState } from "react";

const Counter = () => {
  const [counter, setCounter] = useState(0);

  return (
    <div>
      <p>Count: {counter}</p>
      <button onClick={() => setCounter(counter + 1)}>+</button>
    </div>
  );
};

export default Counter;
```

### When to use Server vs Client Components?

<table><thead><tr><th>What do you need to do?</th><th>Server Component</th><th>Client Component</th></tr></thead><tbody><tr><td>Fetch data. <a href="/docs/data-fetching/fetching" class="relative">Learn more</a>.</td><td>✅</td><td><a href="/docs/rendering/server-and-client-components#data-fetching" class="relative">⚠️</a></td></tr><tr><td>Access backend resources (directly)</td><td>✅</td><td>❌</td></tr><tr><td>Keep sensitive information on the server (access tokens, API keys, etc)</td><td>✅</td><td>❌</td></tr><tr><td>Keep large dependencies on the server / Reduce client-side JavaScript</td><td>✅</td><td>❌</td></tr><tr><td>Add interactivity and event listeners (<code class="inline">onClick()</code>, <code class="inline">onChange()</code>, etc)</td><td>❌</td><td>✅</td></tr><tr><td>Use State and Lifecycle Effects (<code class="inline">useState()</code>, <code class="inline">useReducer()</code>, <code class="inline">useEffect()</code>, etc)</td><td>❌</td><td>✅</td></tr><tr><td>Use browser-only APIs</td><td>❌</td><td>✅</td></tr><tr><td>Use custom hooks that depend on state, effects, or browser-only APIs</td><td>❌</td><td>✅</td></tr><tr><td>Use <a href="https://reactjs.org/docs/components-and-props.html#function-and-class-components" class="absolute" target="_blank" rel="noopener noreferrer">React Class components</a></td><td>❌</td><td>✅</td></tr></tbody></table>

## Data fetching

Although it's possible to fetch data in Client Components, we recommend fetching data in Server Components unless you have a specific reason for fetching data on the client. Moving data fetching to the server leads to better performance and user experience.

app/posts/ListOfPosts

```
const fetchPost = () => {
  return fetch("https://jsonplaceholder.typicode.com/posts", {
    next: {
      revalidate: 10, //Recupera los datos (hace fetch de datos) cada 10 segundos
    },
  }).then((res) => res.json());
};

const ListOfPosts = async () => {
  const posts = await fetchPost();

  return (
    <>
      {posts.map((post) => (
        <article key={post.id}>
          <Link href="/posts/[id]" as={`/posts/${post.id}`}>
            <h2 style={{ color: "#09f" }}>{post.title}</h2>
            <p>{post.body}</p>
            <LikeButton id={post.id} />
          </Link>
          <hr />
        </article>
      ))}
    </>
  );
};
```

## Pages

A page is UI that is unique to a route. You can define pages by exporting a component from a page.js file. Use nested folders to define a route and a page.js file to make the route publicly accessible.

- A page is always the leaf of the route subtree.
- .js, .jsx, or .tsx file extensions can be used for Pages.
- A page.js file is required to make a route segment publicly accessible.
- Pages are Server Components by default but can be set to a Client Component.
- Pages can fetch data. View the Data Fetching section for more information

app/about/page

```
import React from 'react'

const AboutPage = () => {
  return (
    <h1>AboutPage</h1>
  )
}

export default AboutPage
```

## Layout

A layout is UI that is shared between multiple pages. On navigation, layouts preserve state, remain interactive, and do not re-render. Layouts can also be nested.

You can define a layout by default exporting a React component from a layout.js file. The component should accept a children prop that will be populated with a child layout (if it exists) or a child page during rendering.

app/layout

```
import Navigation from "./components/Navigation";
import "./styles/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        {children}
      </body>
    </html>
  );
}

```

### Grouping Layouts

To use the same layout for different pages you need to group de components inside a folder naming it between parenthesis: `(banner)`
