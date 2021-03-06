
# TripcodeGenerator

Tripcode Generator was written in Javascript and HTML, and it generates insecure tripcodes for Futaba-based imageboards. A copy of the project can be found live at [https://orph.link/tripgen
](https://orph.link/tripgen)

### Performance

Fast uses workers and multithreading which may cause your browser to stop responding.
Medium uses only 1 worker (i.e. 1 thread).
Slow uses Jquery's setinterval.

The performance of Tripcode Generator should vary greatly and is dependent on multiple factors:
* Browser's settings (many of which might throttle Jquery intervals if you're on the slow setting)
* Processor speed
* **Your luck** (tripcodes are generated in a random fashion)
* Tripcode matching settings (Case insensitive and contains should be fastest)

### WARNING
Choosing the "ends with" matching pattern might result in a situation where there are no matching tripcodes. 
**USE IT AT YOUR OWN RISK** 

# Acknowledgement

descryptlib.js - by Emil Mikulic

# Contributing

Feel free to fork the project and submit pull requests.

# License

This project is licensed under the MIT License - see the LICENSE.md file for details