const {
  uploadSingleImage,
  deleteImage,
} = require("../middleware/cloudinary.js");
const Testimonial = require("../model/testimonial.js");
const { asyncHandler } = require("../services/async.handler.js");

const createTestimonial = asyncHandler(async (req, res) => {
  const { fullname, designation, message, rating } = req.body;

  if (!fullname || !designation || !message || !rating) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    let imagePath = null;
    let title = `testimonial_${Date.now()}`;

    if (req.file) {
      imagePath = await uploadSingleImage(req.file.buffer, title);
    }

    const data = await Testimonial.create({
      fullname,
      designation,
      message,
      imageUrl: imagePath,
      title,
      rating,
    });

    res.status(201).json({
      message: "Testimonial created successfully",
      data: {
        fullname,
        designation,
        rating,
        imageUrl: imagePath,
      },
    });
  } catch (error) {
    console.error("Error creating testimonial:", error.message);
    res.status(500).json({ message: "Failed to create testimonial" });
  }
});

const getAllTestimonials = asyncHandler(async (req, res) => {
  try {
    const testimonials = await Testimonial.findAll({
      order: [["createdAt", "DESC"]],
    });
    return res.status(200).json({ success: true, data: testimonials });
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
});

const getTestimonialsById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const testimonial = await Testimonial.findByPk(id);
  if (!testimonial) {
    return res.status(404).json({ error: "Data not found!" });
  }

  return res.status(200).json({
    message: "Data fetched successfully",
    data: testimonial,
  });
});

const updateTestimonial = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { rating, message, fullname, designation, title } = req.body;
  const testimonial = await Testimonial.findByPk(id);
  if (!testimonial) {
    return res
      .status(404)
      .json({ success: false, message: "Testimonial not found" });
  }

  if (req.file) {
    if (testimonial.imageUrl) {
      await deleteImage(testimonial.imageUrl);
    }
    const imageUrl = await uploadSingleImage(
      req.file.buffer,
      `testimonial_${id}`
    );

    await testimonial.update({
      rating,
      imageUrl,
      message,
      fullname,
      designation,
      title,
    });
  }
  return res.status(200).json({
    message: "Data updated successfully",
    data: {
      fullname,
      rating,
      imageUrl,
    },
  });
});

const deleteTestimonial = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const testimonial = await Testimonial.findByPk(id);

  if (!testimonial) {
    return res.status(404).json({ success: false, message: "Data not found" });
  }

  try {
    if (testimonial.imageUrl) {
      const imageDeleted = await deleteImage(testimonial.imageUrl);
      if (!imageDeleted) {
        console.warn("Failed to delete file in cloudinary.");
      }
    }
    await testimonial.destroy();
    return res.status(200).json({
      success: true,
      message: "Data and associated file (if any) deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting testimonial:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to delete testimonial",
    });
  }
});

module.exports = {
  createTestimonial,
  getAllTestimonials,
  getTestimonialsById,
  updateTestimonial,
  deleteTestimonial,
};
