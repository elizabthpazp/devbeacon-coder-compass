
import { useState } from 'react';
import { Code, Copy, Plus, Trash2 } from 'lucide-react';

interface Snippet {
  id: number;
  title: string;
  language: string;
  code: string;
  description: string;
}

export const SnippetManager = () => {
  const [snippets, setSnippets] = useState<Snippet[]>([
    {
      id: 1,
      title: 'React useLocalStorage Hook',
      language: 'typescript',
      code: `const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
};`,
      description: 'Hook personalizado para manejar localStorage en React'
    },
    {
      id: 2,
      title: 'Python API Response Handler',
      language: 'python',
      code: `def handle_api_response(response):
    """
    Maneja respuestas de API con manejo de errores
    """
    try:
        if response.status_code == 200:
            return {"success": True, "data": response.json()}
        elif response.status_code == 404:
            return {"success": False, "error": "Resource not found"}
        else:
            return {"success": False, "error": f"HTTP {response.status_code}"}
    except Exception as e:
        return {"success": False, "error": str(e)}`,
      description: 'Función para manejar respuestas de API con manejo de errores'
    }
  ]);

  const [newSnippet, setNewSnippet] = useState({
    title: '',
    language: 'javascript',
    code: '',
    description: ''
  });

  const [showAddForm, setShowAddForm] = useState(false);

  const addSnippet = () => {
    if (newSnippet.title && newSnippet.code) {
      setSnippets([...snippets, {
        id: Date.now(),
        ...newSnippet
      }]);
      setNewSnippet({ title: '', language: 'javascript', code: '', description: '' });
      setShowAddForm(false);
    }
  };

  const deleteSnippet = (id: number) => {
    setSnippets(snippets.filter(snippet => snippet.id !== id));
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    // Here you could add a toast notification
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-white flex items-center">
          <Code className="mr-2 h-6 w-6 text-blue-400" />
          Code Snippets
        </h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Nuevo Snippet</span>
        </button>
      </div>

      {/* Add Snippet Form */}
      {showAddForm && (
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Agregar Nuevo Snippet</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Título del snippet"
                value={newSnippet.title}
                onChange={(e) => setNewSnippet({...newSnippet, title: e.target.value})}
                className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-400"
              />
              <select
                value={newSnippet.language}
                onChange={(e) => setNewSnippet({...newSnippet, language: e.target.value})}
                className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-400"
              >
                <option value="javascript">JavaScript</option>
                <option value="typescript">TypeScript</option>
                <option value="python">Python</option>
                <option value="css">CSS</option>
                <option value="html">HTML</option>
                <option value="bash">Bash</option>
              </select>
            </div>
            <textarea
              placeholder="Descripción"
              value={newSnippet.description}
              onChange={(e) => setNewSnippet({...newSnippet, description: e.target.value})}
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-400"
              rows={2}
            />
            <textarea
              placeholder="Código"
              value={newSnippet.code}
              onChange={(e) => setNewSnippet({...newSnippet, code: e.target.value})}
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-400 font-mono text-sm"
              rows={8}
            />
            <div className="flex space-x-3">
              <button
                onClick={addSnippet}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors"
              >
                Guardar
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Snippets List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {snippets.map((snippet) => (
          <div key={snippet.id} className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
            <div className="p-4 border-b border-gray-700">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-white">{snippet.title}</h3>
                  <p className="text-sm text-gray-400 mt-1">{snippet.description}</p>
                  <span className="inline-block mt-2 px-2 py-1 bg-blue-600 text-white text-xs rounded">
                    {snippet.language}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => copyToClipboard(snippet.code)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => deleteSnippet(snippet.id)}
                    className="text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
            <div className="p-4">
              <pre className="bg-gray-900 p-3 rounded text-sm overflow-x-auto">
                <code className="text-green-300">{snippet.code}</code>
              </pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
