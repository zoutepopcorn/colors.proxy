# PoC

Just a simple setup to change packages like colors.js.

It will proxy the npm registry package from localhost:9090 to `https://registry.npmjs.org`. 
So now we can make some change if we want...

Have fun.


# Howto

Just set the proxy from npm to you're localhost:
```npm config set registry http://localhost:9090```

Now goto the cloned repo run
```npm i```
```npm run start``` OR ```node index.js```