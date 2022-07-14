#!/usr/bin/env python3
import http.server
import socketserver
import cgi
import webbrowser
import threading
import time
from typing import Final


HOST: Final[str] = "localhost"
PORT: Final[int] = 300 * 10


def open_url(url) -> None:
    delay: int = 2
    print(f"Opening URL {url} in default browser in {delay} seconds")
    time.sleep(delay)
    webbrowser.open_new_tab(url)


def start_server(port = PORT) -> None:
    Handler = http.server.SimpleHTTPRequestHandler
    url = 'http://' + HOST + ":" + str(port)

    httpd: socketserver = socketserver.TCPServer((HOST, port), Handler)

    threading.Thread(target=open_url, args=(url,)).start()

    try:
        print(f"Serving at {url}. Press Ctrl+C to quit.")
        httpd.serve_forever()
    except KeyboardInterrupt:
        httpd.server_close()
    except OSError:
        pass

    httpd.server_close()
    print(f"Server stopped. Port {port} released.")


if __name__ == "__main__":
    try:
        start_server()
    except KeyboardInterrupt:
        print("Keyboard interrupt received.")
    except OSError:
        incremented_port = PORT + 1
        print(f"Port {PORT} busy. Attempting to start server on port {incremented_port}")
        start_server(incremented_port)
