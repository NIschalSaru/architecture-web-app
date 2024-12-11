const {
  uploadAndStoreImageArray,
  deleteImage,
} = require("../middleware/cloudinary.js");
const Testimonial = require("../model/testimonial.js");
const { asyncHandler } = require("../services/async.handler.js");

const createTestimonial = asyncHandler(async (req, res) => {
  const { fullname, designation, message, title, imageUrl, rating } = req.body;

  if (!fullname || !title || !rating || !message) {
    return res.status(400).json({ message: "Fields are required" });
  }

  // const uploadedImagePath = imageUrl
  //   ? await uploadAndStoreImageArray(imageUrl, title).catch(() => {
  //       throw new Error("Error uploading image");
  //     })
  //   : null;

  const data = await Testimonial.create({
    fullname,
    designation,
    message,
    title,
    // imageUrl: uploadedImagePath,
    rating,
  });

  if (data) {
    res.status(201).json({
      message: "Testimonial created successfully",
      data: {
        fullname,
        rating,
      },
    });
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
  const { rating, imageUrl, message, fullname, designation, title } = req.body;
  const testimonial = await Testimonial.findByPk(id);
  if (!testimonial) {
    return res
      .status(404)
      .json({ success: false, message: "Testimonial not found" });
  }
  await testimonial.update({
    rating,
    imageUrl,
    message,
    fullname,
    designation,
    title,
  });
  return res.status(200).json({
    message: "Data updated successfully",
  });
});

const deleteTestimonial = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const testimonial = await Testimonial.findByPk(id);
  if (!testimonial) {
    return res.status(404).json({ success: false, message: "Data not found" });
  }
  // if (testimonial.imageUrl) await deleteImage(testimonial.imageUrl);
  await testimonial.destroy();
  return res
    .status(200)
    .json({ success: true, message: "Testimonial deleted successfully" });
});

module.exports = {
  createTestimonial,
  getAllTestimonials,
  getTestimonialsById,
  updateTestimonial,
  deleteTestimonial,
};
