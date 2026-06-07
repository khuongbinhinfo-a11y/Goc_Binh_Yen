export const metadata = {
  title: 'Hướng dẫn xóa dữ liệu người dùng - Hồn Thơ',
  description:
    'Hướng dẫn cách yêu cầu xóa dữ liệu liên quan đến tương tác với website, ứng dụng hoặc Fanpage Facebook Messenger của Hồn Thơ.',
};

export default function DataDeletionPage() {
  return (
    <main className="mx-auto px-4 py-10 max-w-3xl">
      <h1 className="text-2xl font-semibold mb-4">Hướng dẫn xóa dữ liệu người dùng - Hồn Thơ</h1>

      <p className="mb-4">Người dùng có thể yêu cầu Hồn Thơ xóa dữ liệu liên quan đến quá trình tương tác với website,
      ứng dụng hoặc Fanpage Facebook Messenger của Hồn Thơ.</p>

      <h2 className="text-lg font-medium mt-6 mb-2">1. Cách gửi yêu cầu xóa dữ liệu</h2>
      <p className="mb-2">Vui lòng gửi email đến:</p>
      <p className="mb-4"><a href="mailto:khuongbinh.info@gmail.com" className="underline">khuongbinh.info@gmail.com</a></p>

      <p className="mb-2">Tiêu đề email:</p>
      <p className="mb-4 font-medium">Yêu cầu xóa dữ liệu Hồn Thơ</p>

      <p className="mb-2">Nội dung email nên gồm:</p>
      <ul className="list-disc pl-6 mb-4">
        <li>Tên Facebook hoặc tài khoản đã dùng để tương tác với Hồn Thơ.</li>
        <li>Mô tả ngắn về dữ liệu muốn xóa.</li>
        <li>Ảnh chụp màn hình nếu có.</li>
        <li>Thời điểm tương tác gần nhất nếu nhớ được.</li>
      </ul>

      <h2 className="text-lg font-medium mt-6 mb-2">2. Thời gian xử lý</h2>
      <p className="mb-4">Sau khi nhận được yêu cầu, Hồn Thơ sẽ kiểm tra và xử lý trong thời gian hợp lý. Nếu cần thêm
      thông tin để xác minh, Hồn Thơ sẽ phản hồi qua email.</p>

      <h2 className="text-lg font-medium mt-6 mb-2">3. Lưu ý</h2>
      <p className="mb-4">Hồn Thơ chỉ có thể xử lý dữ liệu do Hồn Thơ quản lý hoặc lưu trữ trong hệ thống hỗ trợ của mình.
      Hồn Thơ không thể xóa dữ liệu do Facebook, Meta hoặc các nền tảng bên thứ ba lưu giữ độc lập. Người dùng có thể
      quản lý dữ liệu Facebook trực tiếp trong phần cài đặt tài khoản Facebook của mình.</p>

      <h2 className="text-lg font-medium mt-6 mb-2">4. Liên hệ</h2>
      <p className="mb-4">Nếu có câu hỏi về việc xóa dữ liệu, vui lòng liên hệ: <a href="mailto:khuongbinh.info@gmail.com" className="underline">khuongbinh.info@gmail.com</a></p>

      <p className="text-sm text-gray-600">Cập nhật lần cuối: 07/06/2026</p>

      <p className="mt-6"><a href="https://www.hontho.com" className="underline">Về trang chủ Hồn Thơ</a></p>
    </main>
  );
}
