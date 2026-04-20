import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default function apiServerPlugin() {
  let serverProcess;

  return {
    name: 'api-server',
    apply: 'serve',
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
