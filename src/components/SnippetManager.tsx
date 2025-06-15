
import { useState } from 'react';
import { Code, Copy, Plus, Trash2 } from 'lucide-react';
import { useSnippets } from '@/hooks/useSnippets';

export const SnippetManager = () => {
  const { snippets, addSnippet, deleteSnippet } = useSnippets();

  const [newSnippet, setNewSnippet] = useState({
    title: '',
    language: 'javascript',
    code: '',
    description: ''
  });

  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddSnippet = async () => {
    if (newSnippet.title && newSnippet.code) {
      await addSnippet(newSnippet);
      setNewSnippet({ title: '', language: 'javascript', code: '', description: '' });
      setShowAddForm(false);
    }
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
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
          <span>New Snippet</span>
        </button>
      </div>

      {/* Add Snippet Form */}
      {showAddForm && (
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Add New Snippet</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Snippet title"
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
              placeholder="Description"
              value={newSnippet.description}
              onChange={(e) => setNewSnippet({...newSnippet, description: e.target.value})}
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-400"
              rows={2}
            />
            <textarea
              placeholder="Code"
              value={newSnippet.code}
              onChange={(e) => setNewSnippet({...newSnippet, code: e.target.value})}
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-400 font-mono text-sm"
              rows={8}
            />
            <div className="flex space-x-3">
              <button
                onClick={handleAddSnippet}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors"
              >
                Save
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition-colors"
              >
                Cancel
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
