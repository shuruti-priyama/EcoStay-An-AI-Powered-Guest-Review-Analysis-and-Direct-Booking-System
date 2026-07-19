import React, { useEffect, useRef, useState } from 'react';
import { Plus, Pencil, Trash2, X, Upload, Image as ImageIcon, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import Loader from '../../components/Loader';
import api from '../../api/axios';

const emptyForm = {
  name: '', description: '', type: 'Cottage', pricePerNight: '', maxGuests: 2,
  totalRooms: 1, images: [], amenities: [], isActive: true,
};

const ROOM_TYPES = ['Cottage', 'Treehouse', 'Mud House', 'Bamboo Villa', 'Riverside Cabin', 'Farmstay Room'];

const AMENITY_SUGGESTIONS = [
  'WiFi', 'Breakfast Included', 'Free Parking', 'Bonfire',
  'Swimming Pool', 'Garden', 'Mountain View', 'Lake View',
  'Air Conditioning', 'TV', 'Pet Friendly', 'Airport Pickup',
  'Laundry', 'Tea/Coffee Maker', 'Hot Water', 'Security',
  'Bicycle Rental', 'Spa/Sauna', 'Home-cooked Meals', 'Power Backup',
];

const ManageRooms = ({ ownerMode = false }) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [customAmenity, setCustomAmenity] = useState('');
  const fileInputRef = useRef(null);

  const fetchRooms = async () => {
    setLoading(true);
    try {
      
      const res = await api.get(ownerMode ? '/rooms/mine' : '/rooms');
      setRooms(res.data.data);
    } catch (err) {
      toast.error('Failed to load rooms');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRooms(); }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setForm(emptyForm);
    setCustomAmenity('');
    setModalOpen(true);
  };

  const openEditModal = (room) => {
    setEditingId(room._id);
    setForm({
      name: room.name,
      description: room.description,
      type: room.type,
      pricePerNight: room.pricePerNight,
      maxGuests: room.maxGuests,
      totalRooms: room.totalRooms,
      images: room.images || [],
      amenities: room.amenities || [],
      isActive: room.isActive,
    });
    setCustomAmenity('');
    setModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

 
  const handleFilesSelected = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setUploadingImage(true);
    try {
      const uploadedUrls = [];
      for (const file of files) {
        const data = new FormData();
        data.append('image', file);
        const res = await api.post('/rooms/upload-image', data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        uploadedUrls.push(res.data.data.url);
      }
      setForm((prev) => ({ ...prev, images: [...prev.images, ...uploadedUrls] }));
      toast.success(`${uploadedUrls.length} image${uploadedUrls.length > 1 ? 's' : ''} uploaded`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Image upload failed');
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = ''; // allow re-selecting the same file
    }
  };

  const removeImage = (url) => {
    setForm((prev) => ({ ...prev, images: prev.images.filter((img) => img !== url) }));
  };

  const toggleAmenity = (amenity) => {
    setForm((prev) => {
      const has = prev.amenities.includes(amenity);
      return {
        ...prev,
        amenities: has ? prev.amenities.filter((a) => a !== amenity) : [...prev.amenities, amenity],
      };
    });
  };

  const addCustomAmenity = () => {
    const trimmed = customAmenity.trim();
    if (!trimmed) return;
    if (form.amenities.includes(trimmed)) {
      toast.error('Already added');
      return;
    }
    setForm((prev) => ({ ...prev, amenities: [...prev.amenities, trimmed] }));
    setCustomAmenity('');
  };

  const removeAmenity = (amenity) => {
    setForm((prev) => ({ ...prev, amenities: prev.amenities.filter((a) => a !== amenity) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.images.length === 0) {
      toast.error('Add at least one photo before saving');
      return;
    }
    setSaving(true);
    try {
      const payload = {
        ...form,
        pricePerNight: Number(form.pricePerNight),
        maxGuests: Number(form.maxGuests),
        totalRooms: Number(form.totalRooms),
      };

      if (editingId) {
        await api.put(`/rooms/${editingId}`, payload);
        toast.success('Room updated');
      } else {
        await api.post('/rooms', payload);
        toast.success('Room created');
      }
      setModalOpen(false);
      fetchRooms();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not save room');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this room? This cannot be undone.')) return;
    try {
      await api.delete(`/rooms/${id}`);
      toast.success('Room deleted');
      fetchRooms();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not delete room');
    }
  };

  if (loading) return <Loader label="Loading rooms..." />;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-semibold text-forest-800 dark:text-sand-50">Rooms ({rooms.length})</h2>
        <button onClick={openCreateModal} className="btn-accent !px-5 !py-2 text-sm">
          <Plus size={16} /> Add Room
        </button>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-forest-100 dark:border-forest-700">
        <table className="w-full min-w-[700px] text-left font-body text-sm">
          <thead className="bg-forest-50 dark:bg-forest-900 text-forest-700 dark:text-sand-200">
            <tr>
              <th className="px-4 py-3">Room</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Price/night</th>
              <th className="px-4 py-3">Units</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-forest-50 dark:divide-forest-800">
            {rooms.map((room) => (
              <tr key={room._id}>
                <td className="px-4 py-3 font-medium text-forest-800 dark:text-sand-50">{room.name}</td>
                <td className="px-4 py-3 text-ink/65 dark:text-sand-100/65">{room.type}</td>
                <td className="px-4 py-3 text-ink/65 dark:text-sand-100/65">₹{room.pricePerNight.toLocaleString('en-IN')}</td>
                <td className="px-4 py-3 text-ink/65 dark:text-sand-100/65">{room.totalRooms}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${room.isActive ? 'bg-forest-100 dark:bg-forest-800 text-forest-700 dark:text-sand-200' : 'bg-gray-200 text-gray-600 dark:bg-gray-500/20 dark:text-gray-300'}`}>
                    {room.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-3">
                    <button onClick={() => openEditModal(room)} className="text-forest-700 dark:text-sand-200 hover:text-clay-500"><Pencil size={16} /></button>
                    <button onClick={() => handleDelete(room._id)} className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white dark:bg-forest-800 p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-semibold text-forest-800 dark:text-sand-50">{editingId ? 'Edit Room' : 'Add New Room'}</h3>
              <button onClick={() => setModalOpen(false)}><X size={20} className="text-ink/50 dark:text-sand-100/50" /></button>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <input name="name" required placeholder="Room name" value={form.name} onChange={handleChange} className="input-field" />
              <textarea name="description" required placeholder="Description" rows={3} value={form.description} onChange={handleChange} className="input-field" />

              <select name="type" value={form.type} onChange={handleChange} className="input-field">
                {ROOM_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>

              <div className="grid grid-cols-3 gap-3">
                <input name="pricePerNight" type="number" min="0" required placeholder="Price/night" value={form.pricePerNight} onChange={handleChange} className="input-field" />
                <input name="maxGuests" type="number" min="1" required placeholder="Max guests" value={form.maxGuests} onChange={handleChange} className="input-field" />
                <input name="totalRooms" type="number" min="0" required placeholder="Total units" value={form.totalRooms} onChange={handleChange} className="input-field" />
              </div>

              {/* Photos */}
              <div>
                <label className="mb-1.5 block font-body text-sm font-medium text-ink/80 dark:text-sand-100/80">
                  Photos
                </label>

                {form.images.length > 0 && (
                  <div className="mb-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
                    {form.images.map((url) => (
                      <div key={url} className="group relative aspect-square overflow-hidden rounded-lg border border-forest-100 dark:border-forest-700">
                        <img src={url} alt="Room" className="h-full w-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removeImage(url)}
                          className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  multiple
                  onChange={handleFilesSelected}
                  className="hidden"
                  id="room-image-input"
                />
                <label
                  htmlFor="room-image-input"
                  className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-forest-200 dark:border-forest-700 px-4 py-3 font-body text-sm text-forest-700 dark:text-sand-200 hover:bg-forest-50 dark:hover:bg-forest-900 transition-colors"
                >
                  {uploadingImage ? (
                    <><Loader2 size={16} className="animate-spin" /> Uploading...</>
                  ) : (
                    <><Upload size={16} /> Upload photos from your device</>
                  )}
                </label>
                <p className="mt-1.5 flex items-center gap-1 font-body text-xs text-ink/40 dark:text-sand-100/40">
                  <ImageIcon size={12} /> JPG, PNG, WEBP or GIF, up to 5MB each
                </p>
              </div>

              {/* Amenities */}
              <div>
                <label className="mb-1.5 block font-body text-sm font-medium text-ink/80 dark:text-sand-100/80">
                  Amenities
                </label>

                {form.amenities.length > 0 && (
                  <div className="mb-2 flex flex-wrap gap-2">
                    {form.amenities.map((a) => (
                      <span
                        key={a}
                        className="flex items-center gap-1.5 rounded-full bg-forest-100 dark:bg-forest-800 px-3 py-1 font-body text-xs font-medium text-forest-800 dark:text-sand-100"
                      >
                        {a}
                        <button type="button" onClick={() => removeAmenity(a)} className="text-forest-500 hover:text-red-500">
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                <p className="mb-1.5 font-body text-xs text-ink/50 dark:text-sand-100/50">Tap to add a suggestion:</p>
                <div className="flex flex-wrap gap-1.5">
                  {AMENITY_SUGGESTIONS.map((s) => {
                    const active = form.amenities.includes(s);
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => toggleAmenity(s)}
                        className={`rounded-full border px-2.5 py-1 font-body text-xs transition-colors ${
                          active
                            ? 'border-forest-700 bg-forest-700 text-sand-50'
                            : 'border-forest-100 dark:border-forest-700 text-ink/70 dark:text-sand-100/70 hover:bg-forest-50 dark:hover:bg-forest-900'
                        }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-2 flex gap-2">
                  <input
                    type="text"
                    value={customAmenity}
                    onChange={(e) => setCustomAmenity(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') { e.preventDefault(); addCustomAmenity(); }
                    }}
                    placeholder="Or type a custom amenity..."
                    className="input-field flex-1"
                  />
                  <button type="button" onClick={addCustomAmenity} className="btn-secondary !px-4 text-sm">
                    Add
                  </button>
                </div>
              </div>

              <label className="flex items-center gap-2 font-body text-sm text-ink/70 dark:text-sand-100/70">
                <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleChange} className="h-4 w-4 rounded border-forest-300 dark:border-forest-700" />
                Room is active and bookable
              </label>

              <button type="submit" disabled={saving || uploadingImage} className="btn-primary w-full">
                {saving ? 'Saving...' : editingId ? 'Update Room' : 'Create Room'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageRooms;