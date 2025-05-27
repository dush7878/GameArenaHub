import Banner from '../models/Banner.js';

// GET all banners
export const getAllBanners = async (req, res) => {
  try {
    const banners = await Banner.find().sort({ createdAt: -1 });
    res.json(banners);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const uploadBanner = async (req, res) => {
  try {
    const { title } = req.body;
    const imageUrl = req.file.path;

    const newBanner = new Banner({
      title,
      imageUrl,
      isActive: false,
    });

    await newBanner.save();
    res.status(201).json({ message: 'Banner uploaded', banner: newBanner });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to upload banner' });
  }
};

// PATCH toggle active status
export const toggleBannerStatus = async (req, res) => {
  const { id } = req.params;

  try {
    const banner = await Banner.findById(id);
    if (!banner) return res.status(404).json({ message: 'Banner not found' });

    if (!banner.isActive) {
      const activeCount = await Banner.countDocuments({ isActive: true });
      if (activeCount >= 5) {
        return res.status(400).json({ message: 'Only 5 banners can be active at a time' });
      }
    }

    banner.isActive = !banner.isActive;
    await banner.save();
    res.json({ message: `Banner ${banner.isActive ? 'activated' : 'deactivated'}` });
  } catch (err) {
    res.status(500).json({ message: 'Error toggling status' });
  }
};

// DELETE banner
export const deleteBanner = async (req, res) => {
  const { id } = req.params;

  try {
    await Banner.findByIdAndDelete(id);
    res.json({ message: 'Banner deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting banner' });
  }
};
