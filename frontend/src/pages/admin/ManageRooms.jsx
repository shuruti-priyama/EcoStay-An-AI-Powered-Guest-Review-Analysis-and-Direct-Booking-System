import React, { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import toast from 'react-hot-toast';
import Loader from '../../components/Loader';
import api from '../../api/axios';

const emptyForm = {
  name: '', description: '', type: 'Cottage', pricePerNight: '', maxGuests: 2,
  totalRooms: 1, images: '', amenities: '', isActive: true,
};

const ROOM_TYPES = ['Cottage', 'Treehouse', 'Mud House', 'Bamboo Villa', 'Riverside Cabin', 'Farmstay Room'];

const ManageRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const res = await api.get('/rooms');
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
      images: (room.images || []).join(', '),
      amenities: (room.amenities || []).join(', '),
      isActive: room.isActive,
    });
    setModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        pricePerNight: Number(form.pricePerNight),
        maxGuests: Number(form.maxGuests),
        totalRooms: Number(form.totalRooms),
        images: form.images.split(',').map((s) => s.trim()).filter(Boolean),
        amenities: form.amenities.split(',').map((s) => s.trim()).filter(Boolean),
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

              <input name="images" placeholder="Image URLs, comma-separated" value={form.images} onChange={handleChange} className="input-field" />
              <input name="amenities" placeholder="Amenities, comma-separated" value={form.amenities} onChange={handleChange} className="input-field" />

              <label className="flex items-center gap-2 font-body text-sm text-ink/70 dark:text-sand-100/70">
                <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleChange} className="h-4 w-4 rounded border-forest-300 dark:border-forest-700" />
                Room is active and bookable
              </label>

              <button type="submit" disabled={saving} className="btn-primary w-full">
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
