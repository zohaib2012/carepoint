import { useState, useEffect } from 'react';
import API from '../utils/axios';

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    API.get('/gallery')
      .then(({ data }) => setImages(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="gradient-bg py-16 sm:py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-white/80 font-semibold text-sm uppercase tracking-wider">Gallery</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-3">Our Medical Facility</h1>
          <p className="text-white/70 mt-4 text-lg max-w-2xl mx-auto">
            Take a virtual tour of our state-of-the-art medical facility and see where healing happens.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
            </div>
          ) : images.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No gallery images yet.</p>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {images.map((img) => (
                <div
                  key={img._id}
                  onClick={() => setSelected(img)}
                  className="break-inside-avoid cursor-pointer group relative rounded-2xl overflow-hidden"
                >
                  <img src={img.imageUrl} alt={img.caption} className="w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-end">
                    {img.caption && (
                      <p className="text-white p-4 opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium">
                        {img.caption}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {selected && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <img src={selected.imageUrl} alt={selected.caption} className="w-full max-h-[80vh] object-contain rounded-2xl" />
            {selected.caption && <p className="text-white text-center mt-4 text-lg">{selected.caption}</p>}
            <button onClick={() => setSelected(null)} className="absolute top-4 right-4 text-white text-3xl hover:text-primary-400">&times;</button>
          </div>
        </div>
      )}
    </>
  );
}
