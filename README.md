# jsonbin-proxy-server

## Introduction

This repository serve as an backend server for your frontend application to send request and receive response bypassing direct communication with your data storage service (i.e., json bin).

The purpose is to understand how to secure your data retrieval processes through filtering and restructuring your data response before passing back to your frontend for consumption, rather than consuming it directly from the service provider/tech stack.

### 1. Setup

1. Duplicate a copy of the `env.example` file and rename it as `.env`.
2. Create a new private JSON BIN.
3. Add your JSON BIN ID and X-MASTER-KEY to the respective variables in `.env` file.
4. In the terminal, run `npm install`.

### 2. Execution
1. In the terminal, type `node index.js`
2. Go to `Ports` tab at the bottom panel of CodeSpace
3. Right-Click on the port `3001`
4. Select `Port Visibility` > select `Public` to change its visibility

### 3. Testing
1. In the `Ports` tab, open Port 3001 in the browser and put `/health` at the back of the URL