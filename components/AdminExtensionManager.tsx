"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Loader2, Image as ImageIcon, Link as LinkIcon, DollarSign } from "lucide-react";

type Extension = {
    id: string;
    name: string;
    slug: string;
    description: string;
    shortDescription: string;
    price: number;
    priceId: string;
    image?: string | null;
    chromeWebStoreLink?: string | null;
    isLive: boolean;
};

export default function AdminExtensionManager() {
    const [extensions, setExtensions] = useState<Extension[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [showForm, setShowForm] = useState(false);

    // Form State
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [shortDescription, setShortDescription] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [priceId, setPriceId] = useState("");
    const [link, setLink] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isLive, setIsLive] = useState(false);

    useEffect(() => {
        fetchExtensions();
    }, []);

    const fetchExtensions = async () => {
        try {
            const res = await fetch("/api/admin/extensions");
            if (res.ok) {
                const data = await res.json();
                setExtensions(data);
            }
        } catch (error) {
            console.error("Failed to fetch extensions", error);
        } finally {
            setIsLoading(false);
        }
    };

    const generateSlug = (val: string) => {
        return val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        if (!slug || slug === generateSlug(name)) {
            setSlug(generateSlug(e.target.value));
        }
    };

    const handleSubmit = async (e: React.FormEvent, forceLive?: boolean) => {
        if (e) e.preventDefault();
        setIsSaving(true);

        const currentIsLive = forceLive !== undefined ? forceLive : isLive;

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("slug", slug);
            formData.append("shortDescription", shortDescription);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("priceId", priceId);
            formData.append("chromeWebStoreLink", link);
            formData.append("isLive", currentIsLive.toString());
            formData.append("features", "[]"); // Simplified for V1

            if (imageFile) {
                formData.append("image", imageFile);
            }

            const res = await fetch("/api/admin/extensions", {
                method: "POST",
                body: formData
            });

            if (res.ok) {
                await fetchExtensions();
                resetForm();
            } else {
                const data = await res.json();
                alert(data.error || "Failed to save extension.");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred while saving.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: string, extName: string) => {
        if (!confirm(`Are you sure you want to permanently delete '${extName}'?`)) return;

        try {
            const res = await fetch(`/api/admin/extensions?id=${id}`, {
                method: "DELETE"
            });
            if (res.ok) {
                setExtensions(extensions.filter(e => e.id !== id));
            }
        } catch (error) {
            console.error(error);
        }
    };

    const resetForm = () => {
        setName("");
        setSlug("");
        setShortDescription("");
        setDescription("");
        setPrice("");
        setPriceId("");
        setLink("");
        setImageFile(null);
        setIsLive(false);
        setShowForm(false);
    };

    return (
        <div className="card" style={{ marginTop: '48px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Extension Catalog</h2>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="btn-primary"
                    style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', border: 'none' }}
                >
                    <Plus size={18} />
                    {showForm ? "Cancel" : "Add New Tool"}
                </button>
            </div>

            {showForm && (
                <form onSubmit={(e) => handleSubmit(e)} style={{ background: 'rgba(15, 23, 42, 0.02)', padding: '24px', borderRadius: '12px', marginBottom: '32px', border: '1px solid var(--architect-line)' }}>
                    <h3 style={{ marginBottom: '16px', fontWeight: 600 }}>Create New Extension</h3>

                    <div className="grid grid-cols-2" style={{ gap: '16px', marginBottom: '16px' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '8px', color: 'rgba(15, 23, 42, 0.7)' }}>Tool Name</label>
                            <input type="text" value={name} onChange={handleNameChange} required placeholder="e.g. ScrapeMaster Pro" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--input-border)', background: 'var(--bg)' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '8px', color: 'rgba(15, 23, 42, 0.7)' }}>URL Slug</label>
                            <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} required placeholder="e.g. scrapemaster-pro" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--input-border)', background: 'var(--bg)' }} />
                        </div>
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '8px', color: 'rgba(15, 23, 42, 0.7)' }}>Short Hero Description (Max 60 chars)</label>
                        <input type="text" value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} placeholder="Automate web scraping visually." style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--input-border)', background: 'var(--bg)' }} />
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '8px', color: 'rgba(15, 23, 42, 0.7)' }}>Full Description</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} placeholder="Detailed description of what the tool does..." style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--input-border)', background: 'var(--bg)', resize: 'vertical' }} />
                    </div>

                    <div className="grid grid-cols-2" style={{ gap: '16px', marginBottom: '16px' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '8px', color: 'rgba(15, 23, 42, 0.7)' }}>Monthly Price ($)</label>
                            <div style={{ position: 'relative' }}>
                                <DollarSign size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(15, 23, 42, 0.4)' }} />
                                <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="9.99" style={{ width: '100%', padding: '12px 12px 12px 36px', borderRadius: '8px', border: '1px solid var(--input-border)', background: 'var(--bg)' }} />
                            </div>
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '8px', color: 'rgba(15, 23, 42, 0.7)' }}>Stripe Price ID</label>
                            <input type="text" value={priceId} onChange={(e) => setPriceId(e.target.value)} placeholder="price_1Qx..." style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--input-border)', background: 'var(--bg)' }} />
                        </div>
                    </div>

                    <div className="grid grid-cols-2" style={{ gap: '16px', marginBottom: '24px' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '8px', color: 'rgba(15, 23, 42, 0.7)' }}>Chrome Store Link (Optional)</label>
                            <div style={{ position: 'relative' }}>
                                <LinkIcon size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(15, 23, 42, 0.4)' }} />
                                <input type="url" value={link} onChange={(e) => setLink(e.target.value)} placeholder="https://chromewebstore.google.com/..." style={{ width: '100%', padding: '12px 12px 12px 36px', borderRadius: '8px', border: '1px solid var(--input-border)', background: 'var(--bg)' }} />
                            </div>
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '8px', color: 'rgba(15, 23, 42, 0.7)' }}>Cover Image</label>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} style={{ display: 'none' }} id="img-upload" />
                                <label htmlFor="img-upload" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', background: 'var(--bg)', border: '1px solid var(--input-border)', borderRadius: '8px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, color: 'var(--primary)' }}>
                                    <ImageIcon size={16} />
                                    {imageFile ? imageFile.name : "Upload Image"}
                                </label>
                                {imageFile && <span style={{ fontSize: '0.75rem', color: 'green' }}>Selected</span>}
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                        <input type="checkbox" id="isLive" checked={isLive} onChange={(e) => setIsLive(e.target.checked)} style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
                        <label htmlFor="isLive" style={{ fontWeight: 600, cursor: 'pointer' }}>Publish immediately to storefront</label>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                        <button type="button" onClick={resetForm} style={{ padding: '10px 20px', background: 'transparent', border: 'none', fontWeight: 600, cursor: 'pointer', color: 'rgba(15, 23, 42, 0.6)' }}>Cancel</button>
                        <button
                            type="button"
                            onClick={(e) => handleSubmit(e as any, false)}
                            disabled={isSaving}
                            style={{ padding: '10px 20px', background: 'rgba(15, 23, 42, 0.05)', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', color: 'var(--primary)', opacity: isSaving ? 0.7 : 1 }}
                        >
                            Save as Draft
                        </button>
                        <button
                            type="submit"
                            onClick={() => setIsLive(true)}
                            disabled={isSaving}
                            className="btn-primary"
                            style={{ padding: '10px 24px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', border: 'none', opacity: isSaving ? 0.7 : 1 }}
                        >
                            {isSaving && <Loader2 size={16} className="animate-spin" />}
                            {isSaving ? "Saving..." : "Save & Publish"}
                        </button>
                    </div>
                </form>
            )}

            {isLoading ? (
                <div style={{ padding: '48px', textAlign: 'center', opacity: 0.5 }}>
                    <Loader2 size={32} className="animate-spin" style={{ margin: '0 auto' }} />
                </div>
            ) : (
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--architect-line)', color: 'rgba(15, 23, 42, 0.5)' }}>
                                <th style={{ padding: '12px', fontWeight: 600 }}>Cover</th>
                                <th style={{ padding: '12px', fontWeight: 600 }}>Tool Name</th>
                                <th style={{ padding: '12px', fontWeight: 600 }}>Price</th>
                                <th style={{ padding: '12px', fontWeight: 600 }}>Status</th>
                                <th style={{ padding: '12px', fontWeight: 600, textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {extensions.map((ext) => (
                                <tr key={ext.id} style={{ borderBottom: '1px solid rgba(15, 23, 42, 0.05)' }}>
                                    <td style={{ padding: '16px 12px' }}>
                                        {ext.image ? (
                                            <img src={ext.image} alt={ext.name} style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover', background: 'var(--architect-line)' }} />
                                        ) : (
                                            <div style={{ width: '48px', height: '48px', borderRadius: '8px', background: 'rgba(15, 23, 42, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <ImageIcon size={20} color="rgba(15, 23, 42, 0.2)" />
                                            </div>
                                        )}
                                    </td>
                                    <td style={{ padding: '16px 12px' }}>
                                        <div style={{ fontWeight: 700 }}>{ext.name}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'rgba(15, 23, 42, 0.5)', marginTop: '4px' }}>/{ext.slug}</div>
                                    </td>
                                    <td style={{ padding: '16px 12px', fontWeight: 600 }}>${ext.price}/mo</td>
                                    <td style={{ padding: '16px 12px' }}>
                                        {ext.isLive ? (
                                            <span style={{ background: 'rgba(34, 197, 94, 0.1)', color: 'rgb(22, 163, 74)', padding: '4px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 700 }}>Active</span>
                                        ) : (
                                            <span style={{ background: 'rgba(15, 23, 42, 0.05)', color: 'rgba(15, 23, 42, 0.5)', padding: '4px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 700 }}>Draft</span>
                                        )}
                                    </td>
                                    <td style={{ padding: '16px 12px', textAlign: 'right' }}>
                                        <button
                                            onClick={() => handleDelete(ext.id, ext.name)}
                                            style={{ padding: '8px', color: 'red', background: 'rgba(255, 0, 0, 0.05)', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {extensions.length === 0 && (
                                <tr>
                                    <td colSpan={5} style={{ padding: '48px', textAlign: 'center', color: 'rgba(15, 23, 42, 0.5)' }}>
                                        No extensions found. Create one above!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
