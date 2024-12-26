import { NextApiRequest, NextApiResponse } from 'next';
import { spawn } from 'child_process';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const inputData = req.body;
    console.log('Received input data:', inputData);

    // Use the virtual environment Python
    const pythonPath = path.join(process.cwd(), '..', 'building-your-own-flows', 'venv', 'bin', 'python');
    const scriptPath = path.join(process.cwd(), 'moodify-test-local.py');

    console.log('Python path:', pythonPath);
    console.log('Script path:', scriptPath);

    const python = spawn(pythonPath, [
      scriptPath,
      JSON.stringify(inputData)
    ]);

    let result = '';
    let error = '';

    python.stdout.on('data', (data) => {
      console.log('Python stdout:', data.toString());
      result += data.toString();
    });

    python.stderr.on('data', (data) => {
      console.error('Python stderr:', data.toString());
      error += data.toString();
    });

    await new Promise((resolve, reject) => {
      python.on('close', (code) => {
        console.log('Python process exited with code:', code);
        if (code !== 0) {
          reject(new Error(`Process exited with code ${code}: ${error}`));
        } else {
          resolve(result);
        }
      });

      // Add error handler for spawn
      python.on('error', (err) => {
        console.error('Failed to start Python process:', err);
        reject(new Error(`Failed to start Python process: ${err.message}`));
      });
    });

    try {
      const parsedResult = JSON.parse(result);
      return res.status(200).json({ result: parsedResult });
    } catch (parseError) {
      console.error('Failed to parse Python output:', result);
      return res.status(500).json({
        error: 'Invalid output from Python script',
        details: result
      });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      error: 'Failed to generate playlist',
      details: error.message
    });
  }
}
