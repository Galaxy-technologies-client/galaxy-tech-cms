import type { CollectionConfig } from 'payload'

export const AuditLogs: CollectionConfig = {
  slug: 'audit-logs',
  labels: {
    singular: 'Audit Log',
    plural: 'History & Logs',
  },
  admin: {
    useAsTitle: 'documentTitle',
    defaultColumns: ['action', 'collectionName', 'documentTitle', 'user', 'createdAt'],
  },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: () => false,
    update: () => false,
    delete: () => false,
  },
  fields: [
    {
      name: 'action',
      type: 'select',
      options: ['Create', 'Update', 'Delete'],
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'collectionName',
      label: 'Collection',
      type: 'text',
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'documentId',
      label: 'Document ID',
      type: 'text',
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'documentTitle',
      label: 'Document Title / Name',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      hasMany: false,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'details',
      type: 'json',
      admin: {
        readOnly: true,
      },
    },
  ],
  timestamps: true,
}
