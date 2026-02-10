import React, { useState, useRef } from 'react';
import { Image, Upload, Trash2, Search, Download, Eye, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface EventPhoto {
  id: number;
  bookingId: number;
  eventName: string;
  clientName: string;
  fileName: string;
  fileSize: string;
  uploadDate: string;
  url: string;
}

interface EventGroup {
  bookingId: number;
  eventName: string;
  clientName: string;
  photos: EventPhoto[];
  coverPhoto: EventPhoto;
}

const mockPhotos: EventPhoto[] = [
  {
    id: 1,
    bookingId: 1,
    eventName: 'Sarah Johnson - Wedding',
    clientName: 'Sarah Johnson',
    fileName: 'wedding_photo_001.jpg',
    fileSize: '2.4 MB',
    uploadDate: '2026-02-16',
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
  },
  {
    id: 2,
    bookingId: 1,
    eventName: 'Sarah Johnson - Wedding',
    clientName: 'Sarah Johnson',
    fileName: 'wedding_photo_002.jpg',
    fileSize: '2.1 MB',
    uploadDate: '2026-02-16',
    url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800',
  },
  {
    id: 3,
    bookingId: 2,
    eventName: 'Michael Chen - Corporate Event',
    clientName: 'Michael Chen',
    fileName: 'corporate_photo_001.jpg',
    fileSize: '1.8 MB',
    uploadDate: '2026-02-19',
    url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800',
  },
  {
    id: 4,
    bookingId: 3,
    eventName: 'Emily Rodriguez - Birthday',
    clientName: 'Emily Rodriguez',
    fileName: 'birthday_photo_001.jpg',
    fileSize: '2.3 MB',
    uploadDate: '2026-02-21',
    url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800',
  },
  {
    id: 5,
    bookingId: 1,
    eventName: 'Sarah Johnson - Wedding',
    clientName: 'Sarah Johnson',
    fileName: 'wedding_photo_003.jpg',
    fileSize: '2.6 MB',
    uploadDate: '2026-02-16',
    url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800',
  },
  {
    id: 6,
    bookingId: 3,
    eventName: 'Emily Rodriguez - Birthday',
    clientName: 'Emily Rodriguez',
    fileName: 'birthday_photo_002.jpg',
    fileSize: '1.9 MB',
    uploadDate: '2026-02-21',
    url: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800',
  },
  {
    id: 7,
    bookingId: 1,
    eventName: 'Sarah Johnson - Wedding',
    clientName: 'Sarah Johnson',
    fileName: 'wedding_photo_004.jpg',
    fileSize: '2.2 MB',
    uploadDate: '2026-02-16',
    url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800',
  },
  {
    id: 8,
    bookingId: 2,
    eventName: 'Michael Chen - Corporate Event',
    clientName: 'Michael Chen',
    fileName: 'corporate_photo_002.jpg',
    fileSize: '2.0 MB',
    uploadDate: '2026-02-19',
    url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800',
  },
];

export default function EventPhotosPage() {
  const [photos, setPhotos] = useState<EventPhoto[]>(mockPhotos);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<EventGroup | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Group photos by event
  const groupPhotosByEvent = (photoList: EventPhoto[]): EventGroup[] => {
    const grouped = photoList.reduce((acc, photo) => {
      if (!acc[photo.bookingId]) {
        acc[photo.bookingId] = {
          bookingId: photo.bookingId,
          eventName: photo.eventName,
          clientName: photo.clientName,
          photos: [],
          coverPhoto: photo,
        };
      }
      acc[photo.bookingId].photos.push(photo);
      return acc;
    }, {} as Record<number, EventGroup>);

    return Object.values(grouped);
  };

  const eventGroups = groupPhotosByEvent(photos);
  
  const filteredEvents = eventGroups.filter(
    (event) =>
      event.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeletePhoto = (photoId: number) => {
    if (confirm('Are you sure you want to delete this photo?')) {
      setPhotos(photos.filter((p) => p.id !== photoId));
    }
  };

  const handleDeleteEvent = (bookingId: number) => {
    if (confirm('Are you sure you want to delete all photos from this event?')) {
      setPhotos(photos.filter((p) => p.bookingId !== bookingId));
      setSelectedEvent(null);
    }
  };

  const handleUpload = () => {
    setShowUploadModal(true);
  };

  const totalPhotos = photos.length;
  const uniqueEvents = eventGroups.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-light text-white mb-1">Event Photos</h1>
          <p className="text-sm text-gray-400">Manage photos from all events</p>
        </div>
        <button
          onClick={handleUpload}
          className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-all duration-200"
        >
          <Upload className="w-5 h-5" />
          Upload Photos
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">Total Photos</p>
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <Image className="w-5 h-5 text-black" />
            </div>
          </div>
          <p className="text-2xl font-light text-white">{totalPhotos}</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">Total Events</p>
            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
              <Image className="w-5 h-5 text-white" />
            </div>
          </div>
          <p className="text-2xl font-light text-white">{uniqueEvents}</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search by event or client..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black border border-zinc-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors"
          />
        </div>
      </div>

      {/* Event Grid - One card per event */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredEvents.map((event) => (
          <div
            key={event.bookingId}
            className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-white/50 transition-colors group"
          >
            <div className="aspect-square relative overflow-hidden bg-black">
              <img
                src={event.coverPhoto.url}
                alt={event.eventName}
                className="w-full h-full object-cover"
              />
              {/* Photo Count Badge */}
              <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full">
                <p className="text-xs text-white font-medium">
                  {event.photos.length} photo{event.photos.length !== 1 ? 's' : ''}
                </p>
              </div>
              {/* Hover Actions */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  onClick={() => setSelectedEvent(event)}
                  className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors"
                  title="View all photos"
                >
                  <Eye className="w-4 h-4" />
                  View All
                </button>
              </div>
            </div>
            <div className="p-4">
              <p className="text-sm text-white mb-1 truncate">{event.eventName}</p>
              <p className="text-xs text-gray-400 mb-2 truncate">{event.clientName}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{event.photos.length} photos</span>
                <span>{event.coverPhoto.uploadDate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 text-center">
          <Image className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No events found</p>
        </div>
      )}

      {/* Event Gallery Modal */}
      {selectedEvent && (
        <EventGalleryModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onDeletePhoto={handleDeletePhoto}
          onDeleteEvent={handleDeleteEvent}
        />
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <UploadModal
          onClose={() => setShowUploadModal(false)}
          onUpload={(bookingId, files) => {
            // Mock upload - in production, this would upload to server
            console.log('Uploading files to booking:', bookingId, files);
            
            // Create mock uploaded photos
            const newPhotos = Array.from(files).map((file, index) => ({
              id: Math.max(...photos.map(p => p.id)) + index + 1,
              bookingId: parseInt(bookingId),
              eventName: bookingId === '1' ? 'Sarah Johnson - Wedding' : 
                         bookingId === '2' ? 'Michael Chen - Corporate Event' :
                         'Emily Rodriguez - Birthday',
              clientName: bookingId === '1' ? 'Sarah Johnson' : 
                          bookingId === '2' ? 'Michael Chen' :
                          'Emily Rodriguez',
              fileName: file.name,
              fileSize: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
              uploadDate: new Date().toISOString().split('T')[0],
              url: URL.createObjectURL(file),
            }));
            
            setPhotos([...photos, ...newPhotos]);
            setShowUploadModal(false);
          }}
        />
      )}
    </div>
  );
}

interface EventGalleryModalProps {
  event: EventGroup;
  onClose: () => void;
  onDeletePhoto: (photoId: number) => void;
  onDeleteEvent: (bookingId: number) => void;
}

function EventGalleryModal({ event, onClose, onDeletePhoto, onDeleteEvent }: EventGalleryModalProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const currentPhoto = event.photos[currentPhotoIndex];

  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Close on Escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrevious();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [currentPhotoIndex]);

  const handleNext = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % event.photos.length);
  };

  const handlePrevious = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + event.photos.length) % event.photos.length);
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this photo?')) {
      onDeletePhoto(currentPhoto.id);
      if (event.photos.length === 1) {
        onClose();
      } else if (currentPhotoIndex >= event.photos.length - 1) {
        setCurrentPhotoIndex(Math.max(0, currentPhotoIndex - 1));
      }
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={handleBackdropClick}
    >
      {/* Close Button - Fixed at top right corner */}
      <button
        onClick={onClose}
        className="fixed top-4 right-4 z-[60] p-3 bg-white text-black rounded-full hover:bg-gray-200 transition-colors shadow-lg"
        title="Close (Esc)"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="relative max-w-7xl w-full my-8" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-light text-white">{event.eventName}</h2>
            <p className="text-sm text-gray-400">
              Photo {currentPhotoIndex + 1} of {event.photos.length}
            </p>
          </div>
        </div>

        {/* Main Image with Navigation */}
        <div className="relative">
          <img
            src={currentPhoto.url}
            alt={currentPhoto.fileName}
            className="w-full h-auto max-h-[70vh] object-contain rounded-xl border-2 border-white"
          />

          {/* Navigation Arrows */}
          {event.photos.length > 1 && (
            <>
              <button
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/80 backdrop-blur-sm rounded-full text-white hover:bg-black transition-colors"
                title="Previous (←)"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/80 backdrop-blur-sm rounded-full text-white hover:bg-black transition-colors"
                title="Next (→)"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>

        {/* Photo Details */}
        <div className="mt-4 bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div>
              <p className="text-xs text-gray-400 mb-1">Client</p>
              <p className="text-sm text-white">{event.clientName}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">File Name</p>
              <p className="text-sm text-white truncate">{currentPhoto.fileName}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">File Size</p>
              <p className="text-sm text-white">{currentPhoto.fileSize}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Upload Date</p>
              <p className="text-sm text-white">{currentPhoto.uploadDate}</p>
            </div>
          </div>

          {/* Thumbnail Strip */}
          {event.photos.length > 1 && (
            <div className="pt-4 border-t border-zinc-800">
              <p className="text-xs text-gray-400 mb-3">All Photos</p>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {event.photos.map((photo, index) => (
                  <button
                    key={photo.id}
                    onClick={() => setCurrentPhotoIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentPhotoIndex
                        ? 'border-white scale-105'
                        : 'border-zinc-700 hover:border-white/50'
                    }`}
                  >
                    <img
                      src={photo.url}
                      alt={photo.fileName}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-4 pt-4 border-t border-zinc-800 mt-4">
            <a
              href={currentPhoto.url}
              download={currentPhoto.fileName}
              className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download
            </a>
            <button 
              onClick={handleDelete}
              className="flex items-center gap-2 px-4 py-2 bg-red-600/10 border border-red-600/20 text-red-400 rounded-lg hover:bg-red-600/20 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Delete Photo
            </button>
            <button 
              onClick={() => {
                if (confirm(`Are you sure you want to delete all ${event.photos.length} photos from this event?`)) {
                  onDeleteEvent(event.bookingId);
                }
              }}
              className="flex items-center gap-2 px-4 py-2 bg-red-600/10 border border-red-600/20 text-red-400 rounded-lg hover:bg-red-600/20 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Delete All Event Photos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface UploadModalProps {
  onClose: () => void;
  onUpload: (bookingId: string, files: FileList) => void;
}

function UploadModal({ onClose, onUpload }: UploadModalProps) {
  const [selectedBooking, setSelectedBooking] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setFiles([...files, ...newFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (files.length > 0 && selectedBooking) {
      // Convert array back to FileList-like object
      const dataTransfer = new DataTransfer();
      files.forEach(file => dataTransfer.items.add(file));
      onUpload(selectedBooking, dataTransfer.files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files).filter(file => 
        file.type.startsWith('image/')
      );
      setFiles([...files, ...newFiles]);
    }
  };

  const totalSize = files.reduce((acc, file) => acc + file.size, 0);
  const totalSizeMB = (totalSize / 1024 / 1024).toFixed(2);

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl max-w-2xl w-full p-6 my-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-light text-white">Upload Event Photos</h2>
            <p className="text-sm text-gray-400 mt-1">Upload multiple photos to one event</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Select Event/Booking *</label>
            <select
              value={selectedBooking}
              onChange={(e) => setSelectedBooking(e.target.value)}
              className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white transition-colors"
              required
            >
              <option value="">Choose a booking...</option>
              <option value="1">Booking #1 - Sarah Johnson - Wedding</option>
              <option value="2">Booking #2 - Michael Chen - Corporate Event</option>
              <option value="3">Booking #3 - Emily Rodriguez - Birthday</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Select Photos *</label>
            <div 
              className="border-2 border-dashed border-zinc-700 rounded-lg p-8 text-center hover:border-white transition-colors cursor-pointer"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400 mb-2">
                Drag and drop photos here, or click to browse
              </p>
              <p className="text-xs text-gray-500">
                Supports: JPG, PNG, GIF (Multiple files allowed)
              </p>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          </div>

          {/* Selected Files Preview */}
          {files.length > 0 && (
            <div className="bg-black border border-zinc-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-white">
                  Selected Files: <span className="text-gray-400">{files.length} file(s)</span>
                </p>
                <p className="text-xs text-gray-400">Total: {totalSizeMB} MB</p>
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {files.map((file, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between bg-zinc-900 rounded-lg p-3"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <Image className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-white truncate">{file.name}</p>
                        <p className="text-xs text-gray-500">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFile(index);
                      }}
                      className="p-1 text-gray-400 hover:text-red-400 transition-colors flex-shrink-0 ml-2"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end gap-4 pt-4 border-t border-zinc-800">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={files.length === 0 || !selectedBooking}
              className="px-6 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Upload {files.length > 0 ? `${files.length} Photo${files.length !== 1 ? 's' : ''}` : 'Photos'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}