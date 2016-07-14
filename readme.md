#Architecture

##Assumptions

- Users login
- Change profile\preferences
- Like
- Search
- 1mil users per city online within 1week window
- 100'000 users per city online within 24h window

Search is affected by users own likes\profile as well as by every other users likes\profile

We can persist them in Prostgres/Mongo and load in memory on demand
If user takes up to 10kb in memory we can store, 100 users per MB, or 100'000 users per GB of memory.
AWS has nodes with up to 128GB of memory

If during peak hour every user issues 1000 search requrests we have to process 100000*1000/60/60= ~30k requests per second
That means we will likeley hit CPU limit even if we have enough memory.

If we have one speciefic CPU heavy algorithm to search users we can probably write more efficient solution than elasticsearch, and offload standard user search queries to elasticsearch.


Search indicies update speed:
User updates could be propagated across cluster via RabbitMQ or similar protocol.
Even if it takes 10 minute to update user likes\profile changes that is still very good, because each search would still be instantly affected by users own likes (they come in search query) and will be affected by other people likes with 10 min delay.

Proposed archtecture:
- Mongo\Postgress for persistent storage
- In memory nodes for CPU heavy match alogrithm
- Rebuild in memory indexes every 10 minutes
- Elastic search nodes for standard searches