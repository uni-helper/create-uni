export default function getData({ oldData }) {
  return {
    autoGenerate: {
      ...oldData.autoGenerate,
      pages: true,
    },
  }
}
