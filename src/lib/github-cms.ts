/**
 * Système de sauvegarde via GitHub API
 * Permet de modifier data.json sans base de données externe.
 */

export async function saveToGitHub(content: any) {
  const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
  const REPO_OWNER = import.meta.env.VITE_GITHUB_OWNER;
  const REPO_NAME = import.meta.env.VITE_GITHUB_REPO;
  const FILE_PATH = 'public/data.json';

  if (!GITHUB_TOKEN || !REPO_OWNER || !REPO_NAME) {
    throw new Error("Configuration GitHub manquante (Token, Owner ou Repo)");
  }

  try {
    // 1. Récupérer le SHA du fichier actuel (obligatoire pour GitHub)
    const getFileRes = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`, {
      headers: { 'Authorization': `token ${GITHUB_TOKEN}` }
    });
    
    const fileData = await getFileRes.json();
    const sha = fileData.sha;

    // 2. Envoyer la mise à jour
    const updateRes = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Mise à jour du contenu via le site (Live Edit)',
        content: btoa(unescape(encodeURIComponent(JSON.stringify(content, null, 2)))),
        sha: sha
      })
    });

    if (!updateRes.ok) {
      const error = await updateRes.json();
      throw new Error(error.message || "Erreur lors de la mise à jour GitHub");
    }

    return true;
  } catch (error) {
    console.error("GitHub Save Error:", error);
    throw error;
  }
}
