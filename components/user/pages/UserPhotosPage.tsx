import React, { useState } from 'react';
import { Image, Download, Eye, X, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

interface EventPhoto {
  id: number;
  bookingId: number;
  eventName: string;
  fileName: string;
  fileSize: string;
  uploadDate: string;
  url: string;
}

interface EventGroup {
  bookingId: number;
  eventName: string;
  eventDate: string;
  photos: EventPhoto[];
  coverPhoto: EventPhoto;
}

interface UserPhotosPageProps {
  currentUser: any;
}

const mockPhotos: EventPhoto[] = [
  {
    id: 1,
    bookingId: 1,
    eventName: 'Sarah & Mike Wedding',
    fileName: 'wedding_photo_001.jpg',
    fileSize: '2.4 MB',
    uploadDate: '2026-03-16',
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
  },
  {
    id: 2,
    bookingId: 1,
    eventName: 'Sarah & Mike Wedding',
    fileName: 'wedding_photo_002.jpg',
    fileSize: '2.1 MB',
    uploadDate: '2026-03-16',
    url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800',
  },
  {
    id: 3,
    bookingId: 1,
    eventName: 'Sarah & Mike Wedding',
    fileName: 'wedding_photo_003.jpg',
    fileSize: '2.6 MB',
    uploadDate: '2026-03-16',
    url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800',
  },
  {
    id: 4,
    bookingId: 1,
    eventName: 'Sarah & Mike Wedding',
    fileName: 'wedding_photo_004.jpg',
    fileSize: '2.2 MB',
    uploadDate: '2026-03-16',
    url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800',
  },
];

export default function UserPhotosPage({ currentUser }: UserPhotosPageProps) {
  const [photos] = useState<EventPhoto[]>(mockPhotos);
  const [selectedEvent, setSelectedEvent] = useState<EventGroup | null>(null);

  // Group photos by event
  const groupPhotosByEvent = (photoList: EventPhoto[]): EventGroup[] => {
    const grouped = photoList.reduce((acc, photo) => {
      if (!acc[photo.bookingId]) {
        acc[photo.bookingId] = {
          bookingId: photo.bookingId,
          eventName: photo.eventName,
          eventDate: photo.uploadDate,
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
  const totalPhotos = photos.length;
  const totalEvents = eventGroups.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-light text-white mb-1">Event Photos</h1>
          <p className="text-sm text-gray-400">View and download photos from your events</p>
        </div>
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
            <p className="text-sm text-gray-400">Events with Photos</p>
            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
          </div>
          <p className="text-2xl font-light text-white">{totalEvents}</p>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Image className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-white mb-1">About Event Photos</p>
            <p className="text-xs text-gray-400">
              Photos will be uploaded by our admin team after your event. You can view and download all your event photos here.
            </p>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      {eventGroups.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {eventGroups.map((event) => (
            <div
              key={event.bookingId}
              className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-white/50 transition-colors group cursor-pointer"
              onClick={() => setSelectedEvent(event)}
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
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors">
                    <Eye className="w-4 h-4" />
                    View All
                  </button>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-white mb-1 truncate">{event.eventName}</p>
                <p className="text-xs text-gray-400 mb-2">
                  {new Date(event.eventDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{event.photos.length} photos</span>
                  <span>Click to view</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 text-center">
          <Image className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 mb-2">No event photos yet</p>
          <p className="text-sm text-gray-500">
            Photos will appear here after your events are completed
          </p>
        </div>
      )}

      {/* Event Gallery Modal */}
      {selectedEvent && (
        <EventGalleryModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
}

// Event Gallery Modal
interface EventGalleryModalProps {
  event: EventGroup;
  onClose: () => void;
}

function EventGalleryModal({ event, onClose }: EventGalleryModalProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const currentPhoto = event.photos[currentPhotoIndex];

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

  const handleDownloadAll = () => {
    // In production, this would trigger a zip download or download all images
    event.photos.forEach((photo, index) => {
      setTimeout(() => {
        const link = document.createElement('a');
        link.href = photo.url;
        link.download = photo.fileName;
        link.click();
      }, index * 100);
    });
  };

  return (
    <div
      className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Close Button */}
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
          <button
            onClick={handleDownloadAll}
            className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download All
          </button>
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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
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
              <p className="text-xs text-gray-400 mb-3">All Photos ({event.photos.length})</p>
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
              Download This Photo
            </a>
            <button
              onClick={handleDownloadAll}
              className="flex items-center gap-2 px-4 py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download All ({event.photos.length})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
