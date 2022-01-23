# reaktor-2022 (Old frontend version- replaced with full stack!)

This is the first version of my solution for the assignment part of the application for Reaktor's 2022 summer program (more info [here](https://www.reaktor.com/assignment-2022-developers/)).

The final version is located in [this](https://github.com/ernven/reaktor-2022-fullstack-version) repository.

## Background Info

This inital solution was based on a single frontend app, written in React, fetching the data from the "bad" API. Unfortunately, even after trying to optimize it, caching the data and working around the limitations, the loading of the historical data took simply too long. This was due to the massive amount of entries which are available. In the end, the only solution was to implement a backend which will serve only the data which is needed, when it is needed.

All this said, except for the endless loading of entries, the application actually performs alright, and users can see updates from the websockets while the historical data loads. The UI is still smooth and the table displaying the players data is pretty fast (thanks to ag-grid).
