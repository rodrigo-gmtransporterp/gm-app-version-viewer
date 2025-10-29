import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VersionCard from './components/versionCard';

function App() {
  const [versions, setVersions] = useState(null);

  useEffect(() => {
    axios.get('/versions')
      .then(res => setVersions(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <div className="mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-1">Versiones de las Aplicaciones</h1>
        <h3 className="text-lg font-semibold text-gray-600 mb-4">Nuevos Proyectos</h3>
        <hr className="border-t border-gray-300 mb-6" />
        {versions ? (
          Object.entries(versions).map(([packageName, { tracks, description }]) => (
            <div key={packageName} className="mb-8">
              <h2 className="text-xl font-bold text-gray-700 mb-4">Proyecto: {description}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(tracks).map(([track, { name, build }]) => (
                  <VersionCard key={track} track={track} name={name} build={build} />
                ))}
              </div>
            <hr className="border-t border-gray-300 mt-6" />
            </div>
          ))
        ) : (
          <p className="text-gray-600">Obteniendo versiones...</p>
        )}
      </div>
    </div>
  );
}

export default App;