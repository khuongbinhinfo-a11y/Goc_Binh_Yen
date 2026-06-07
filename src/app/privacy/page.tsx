export const metadata = {
  title: 'Chính sách quyền riêng tư - Hồn Thơ',
  description:
    'Chính sách giải thích cách Hồn Thơ xử lý thông tin khi người dùng truy cập website, sử dụng ứng dụng hoặc tương tác với Fanpage Facebook Messenger.',
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto px-4 py-10 max-w-3xl">
      <h1 className="text-2xl font-semibold mb-4">Chính sách quyền riêng tư - Hồn Thơ</h1>

      <p className="mb-4">
        Hồn Thơ là không gian thơ và chiêm nghiệm gắn với nhà thơ Lê Dũng. Chính sách này giải thích cách Hồn
        Thơ xử lý thông tin khi người dùng truy cập website, sử dụng ứng dụng hoặc tương tác với Fanpage Facebook
        Messenger của Hồn Thơ.
      </p>

      <h2 className="text-lg font-medium mt-6 mb-2">1. Thông tin có thể được thu thập</h2>
      <p className="mb-2">Khi người dùng tương tác với Hồn Thơ qua website, ứng dụng hoặc Facebook Messenger, hệ
      thống có thể nhận một số thông tin cơ bản như:</p>
      <ul className="list-disc pl-6 mb-4">
        <li>Tên hiển thị trên Facebook hoặc nền tảng liên quan.</li>
        <li>Mã định danh người dùng do nền tảng cung cấp.</li>
        <li>Nội dung tin nhắn người dùng gửi cho Fanpage.</li>
        <li>Thời điểm tương tác.</li>
        <li>Thông tin kỹ thuật cơ bản phục vụ vận hành website hoặc chatbot.</li>
      </ul>

      <p className="mb-4">Hồn Thơ không yêu cầu người dùng cung cấp mật khẩu, thông tin ngân hàng, căn cước công
      dân, dữ liệu sức khỏe nhạy cảm hoặc các thông tin riêng tư không cần thiết.</p>

      <h2 className="text-lg font-medium mt-6 mb-2">2. Mục đích sử dụng thông tin</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Trả lời câu hỏi và hỗ trợ người dùng.</li>
        <li>Hướng dẫn người dùng đọc thơ, nghe audio hoặc sử dụng các chức năng của Hồn Thơ.</li>
        <li>Xử lý các yêu cầu liên quan đến tài khoản, lịch sử sử dụng hoặc credits nếu có.</li>
        <li>Cải thiện chất lượng nội dung, trải nghiệm người dùng và hệ thống hỗ trợ.</li>
      </ul>

      <h2 className="text-lg font-medium mt-6 mb-2">3. Chia sẻ thông tin</h2>
      <p className="mb-4">Hồn Thơ không bán dữ liệu cá nhân của người dùng. Thông tin có thể được xử lý thông
      qua các nền tảng kỹ thuật cần thiết như Facebook Messenger, hệ thống chatbot, dịch vụ lưu trữ hoặc các công cụ
      vận hành website. Việc xử lý này chỉ nhằm mục đích hỗ trợ người dùng và duy trì hoạt động của Hồn Thơ.</p>

      <h2 className="text-lg font-medium mt-6 mb-2">4. Lưu trữ và bảo mật</h2>
      <p className="mb-4">Hồn Thơ cố gắng bảo vệ thông tin người dùng trong phạm vi hợp lý. Dữ liệu chỉ được lưu giữ
      khi cần thiết cho mục đích hỗ trợ, vận hành hệ thống hoặc xử lý yêu cầu của người dùng.</p>

      <h2 className="text-lg font-medium mt-6 mb-2">5. Quyền của người dùng</h2>
      <p className="mb-4">Người dùng có thể yêu cầu kiểm tra, chỉnh sửa hoặc xóa thông tin liên quan đến mình bằng cách
      liên hệ với Hồn Thơ.</p>
      <p className="mb-4">Email liên hệ: <a href="mailto:khuongbinh.info@gmail.com" className="underline">khuongbinh.info@gmail.com</a></p>

      <h2 className="text-lg font-medium mt-6 mb-2">6. Xóa dữ liệu</h2>
      <p className="mb-4">Người dùng có thể yêu cầu xóa dữ liệu bằng cách gửi email đến <a href="mailto:khuongbinh.info@gmail.com" className="underline">khuongbinh.info@gmail.com</a> hoặc xem hướng dẫn tại: <a href="/data-deletion" className="underline">/data-deletion</a></p>

      <h2 className="text-lg font-medium mt-6 mb-2">7. Cập nhật chính sách</h2>
      <p className="mb-4">Chính sách quyền riêng tư này có thể được cập nhật khi Hồn Thơ thay đổi cách vận hành hoặc
      bổ sung chức năng mới.</p>

      <p className="text-sm text-gray-600">Cập nhật lần cuối: 07/06/2026</p>

      <p className="mt-6"><a href="https://www.hontho.com" className="underline">Về trang chủ Hồn Thơ</a></p>
    </main>
  );
}
