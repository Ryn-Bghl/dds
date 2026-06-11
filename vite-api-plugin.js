import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default function apiServerPlugin() {
  let serverProcess;

  return {
    name: 'api-server',
    apply: 'serve',

    configureServer(server) {
      server.httpServer.on('listening', () => {
        const address = server.httpServer.address();
        const port = address.port;
        const protocol = server.config.server.https ? 'https' : 'http';
        const host = server.config.server.host || 'localhost';
        
        console.log("\n\x1b[32m%s\x1b[0m", `  ➜  Local:   ${protocol}://${host}:${port}/`);
      });
    },

    async configResolved(config) {
      // Only run in dev mode
      if (config.command === 'serve') {
        // Start the API server
        const serverPath = path.join(__dirname, 'server.js');

        serverProcess = spawn('node', [serverPath], {
          stdio: 'inherit',
          shell: true,
        });

        serverProcess.on('error', (err) => {
          console.error('Failed to start API server:', err);
        });

        // Handle graceful shutdown
        process.on('SIGINT', () => {
          if (serverProcess) {
            serverProcess.kill();
          }
          process.exit(0);
        });
      }
    },
  };
}
