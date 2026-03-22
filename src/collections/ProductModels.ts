import type { CollectionConfig } from 'payload'
import { formatSlug } from '../slug'

export const ProductModels: CollectionConfig = {
  slug: 'product-models',
  labels: {
    singular: 'Product',
    plural: 'Products',
  },
  admin: {
    useAsTitle: 'series',
  },
  hooks: {
    afterChange: [
      async ({ doc, req, operation }) => {
        const action = operation === 'create' ? 'Create' : 'Update'
        
        await req.payload.create({
          collection: 'audit-logs',
          data: {
            action,
            collectionName: 'product-models',
            documentId: String(doc.id),
            documentTitle: doc.name || doc.series || String(doc.id),
            user: req.user?.id,
            details: doc,
          },
          req, // Maintained atomicity!
        })
        return doc
      },
    ],
    afterDelete: [
      async ({ doc, req }) => {
        await req.payload.create({
          collection: 'audit-logs',
          data: {
            action: 'Delete',
            collectionName: 'product-models',
            documentId: String(doc.id),
            documentTitle: doc.name || doc.series || String(doc.id),
            user: req.user?.id,
            details: doc,
          },
          req, // Maintained atomicity!
        })
        return doc
      },
    ],
  },
  fields: [
    {
      name: 'series',
      type: 'text',
      required: true,
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'brand',
      type: 'relationship',
      relationTo: 'brands',
    },

    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
    },

    {
      name: 'technology',
      type: 'select',
      options: [
        { label: 'Inverter', value: 'inverter' },
        { label: 'Non-Inverter', value: 'non-inverter' },
      ],
    },

    {
      name: 'description',
      type: 'textarea',
    },

    {
      name: 'images',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
    },

    {
      name: 'features',
      type: 'array',
      fields: [
        {
          name: 'feature',
          type: 'text',
        },
      ],
    },

    {
      name: 'variants',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'capacity',
          label: 'Capacity (Ton)',
          type: 'number',
          admin: {
            placeholder: 'e.g. 1.5. Ton will be added automatically.',
            description: 'Provide only the numerical value. The suffix "Ton" is fixed.',
          },
        },

        {
          name: 'modelNumber',
          type: 'text',
        },

        {
          name: 'mrp',
          label: 'MRP (₹)',
          type: 'number',
        },
        {
          name: 'dealerPrice',
          label: 'Dealer Price (₹)',
          type: 'number',
        },

        {
          name: 'energyRating',
          type: 'number',
          min: 1,
          max: 5,
        },

        {
          name: 'roomSize',
          type: 'text',
        },

        {
          name: 'coolingCapacityKW',
          type: 'number',
        },

        {
          name: 'indoorModel',
          type: 'text',
        },

        {
          name: 'outdoorModel',
          type: 'text',
        },
      ],
    },

    {
      name: 'slug',
      type: 'text',
      unique: true,
      hooks: {
        beforeValidate: [({ data }) => formatSlug(data?.series, 'model')],
      },
    },
  ],
}
