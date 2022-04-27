module.exports = {
  lifecycles: {
    async beforeCreate(data) {
      data.textures = [];
      data.environments = [];
      data.libraryCards = [];
      data.materials = [];
    },
    async beforeUpdate(params, data) {
      if (data.textures == null) data.textures = [];
      if (data.environments == null) data.environments = [];
      if (data.libraryCards == null) data.libraryCards = [];
      if (data.materials == null) data.materials = [];
    },
  },
};
