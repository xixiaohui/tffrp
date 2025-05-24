export const components = {
  h1: (props: React.ComponentProps<'h1'>) => (
    <h1 className="text-3xl font-bold text-indigo-700 mt-6 mb-4" {...props} />
  ),
  h2: (props: React.ComponentProps<'h2'>) => (
    <h2 className="text-2xl font-semibold text-indigo-600 mt-5 mb-3" {...props} />
  ),
  h3: (props: React.ComponentProps<'h3'>) => (
    <h3 className="text-xl font-medium text-indigo-500 mt-4 mb-2" {...props} />
  ),
  p: (props: React.ComponentProps<'p'>) => (
    <p className="text-base text-gray-800 leading-relaxed mb-4" {...props} />
  ),
  ul: (props: React.ComponentProps<'ul'>) => (
    <ul className="list-disc list-inside ml-6 mb-4" {...props} />
  ),
  ol: (props: React.ComponentProps<'ol'>) => (
    <ol className="list-decimal list-inside ml-6 mb-4" {...props} />
  ),
  li: (props: React.ComponentProps<'li'>) => (
    <li className="mb-1" {...props} />
  ),
  a: (props: React.ComponentProps<'a'>) => (
    <a
      className="text-blue-600 hover:text-blue-800 underline"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  blockquote: (props: React.ComponentProps<'blockquote'>) => (
    <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4" {...props} />
  ),
  code: (props: React.ComponentProps<'code'>) => (
    <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono text-pink-600" {...props} />
  ),
  pre: (props: React.ComponentProps<'pre'>) => (
    <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm" {...props} />
  ),
  table: (props: React.ComponentProps<'table'>) => (
    <table className="table-auto border-collapse w-full my-4 text-sm" {...props} />
  ),
  thead: (props: React.ComponentProps<'thead'>) => (
    <thead className="bg-gray-100" {...props} />
  ),
  th: (props: React.ComponentProps<'th'>) => (
    <th className="border px-3 py-2 text-left font-semibold" {...props} />
  ),
  td: (props: React.ComponentProps<'td'>) => (
    <td className="border px-3 py-2" {...props} />
  ),
  hr: (props: React.ComponentProps<'hr'>) => (
    <hr className="my-6 border-gray-300" {...props} />
  ),
};