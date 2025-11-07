For development run at the beginning:

    - docker compose build --build-arg CACHEBUST=$(date +%s)

For running:

    - Start: docker compose up -d
    - Stop: docker compose stop
    - Restart: docker compose start

Rebuilding the app only & no restarting the DB:

    $ docker compose build app --build-arg CACHEBUST=$(date +%s)
    and
    $ docker compose up -d app