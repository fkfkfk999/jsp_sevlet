package board.bean;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;

public class BoardDBBean {
	//이와같이 instance를 만들어 하나의 인스턴스만 사용하도록 하는것을 싱글톤 패턴이라고 한다.
	private static BoardDBBean instance = new BoardDBBean();
	
	public static BoardDBBean getInstance() {
		return instance;
	}
	
	private BoardDBBean() {}
	
	//커넥션 풀에서 커넥션 객체를 얻어온다.(나도 자세히는 모른다.)
	private Connection getConnection() throws Exception{
		//기본 컨텍스트를 받아오는걸로 보인다.
		Context initCtx = new InitialContext();
		//컨텍스트안에 java:comp/env에 해당되는 객체를 받아오는데 우리가 Server.xml에 설정해준 Context태그 부분을 의미하는것 같다.
		Context envCtx = (Context)initCtx.lookup("java:comp/env");
		//Context안에서도 우리가 DB정보를 입력한 Resource부분을 가져온다. 여기서 ()안에 들어가는 부분은 name으로 설정한 부분이다.
		DataSource ds = (DataSource)envCtx.lookup("jdbc/jsptest");
		//DB와 연결된 커넥션을 리턴해준다.
		return ds.getConnection();
	}
	
	//게시판 등록 메서드
	public void insertBoard(BoardDataBean boardVO)throws Exception {
		Connection conn = null;
		PreparedStatement pstmt = null;
		
		try {
			//커넥션 풀에서 커넥션을 리턴받아온다.
			conn = getConnection();
			//insert문을 작성해준다.
			String sql = "insert into testboard1(title, writer, content, regdate) ";
			sql += "values(?, ?, ?, now())";
			
			//커넥션에 해당 sql문을 넣어준다.
			pstmt = conn.prepareStatement(sql);
			//입력할 값들을 각각 설정해준다.
			pstmt.setString(1,boardVO.getTitle());
			pstmt.setString(2,boardVO.getWriter());
			pstmt.setString(3,boardVO.getContent());
			//해당 sql문을 실행시킨다.
			pstmt.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}finally {
			if(pstmt != null) try {pstmt.close();} catch (Exception e2) {}
			if(conn != null) try {conn.close();} catch (Exception e3) {}
		}
	}
	//총 게시글의 숫자를 리턴해준다.
	public int getAllBoardCount()throws Exception {
		Connection conn = null;
		PreparedStatement pstmt = null;
		//셀렉트를 할경우 결과를 받아올 객체가 필요하다.
		ResultSet rs = null;
		
		int cnt = 0;
		
		try {
			//커넥션 풀에서 커넥션을 리턴받아온다.
			conn = getConnection();
			//insert문을 작성해준다.
			String sql = "select count(seqno) from testboard1";
			
			//커넥션에 해당 sql문을 넣어준다.
			pstmt = conn.prepareStatement(sql);
			//해당 sql문을 실행시킨다.
			rs = pstmt.executeQuery();
			
			if(rs.next()) {
				cnt = rs.getInt(1);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}finally {
			if(rs != null) try {rs.close();} catch (Exception e2) {}
			if(pstmt != null) try {pstmt.close();} catch (Exception e3) {}
			if(conn != null) try {conn.close();} catch (Exception e4) {}
		}
		return cnt;
	}
	//총 게시글을 리턴해준다.
	public List<BoardDataBean> getAllBoardData()throws Exception {
		Connection conn = null;
		PreparedStatement pstmt = null;
		//셀렉트를 할경우 결과를 받아올 객체가 필요하다.
		ResultSet rs = null;
		
		List<BoardDataBean> list = null;
		
		try {
			//커넥션 풀에서 커넥션을 리턴받아온다.
			conn = getConnection();
			//insert문을 작성해준다.
			String sql = "select * from testboard1 order by regdate desc";
			
			//커넥션에 해당 sql문을 넣어준다.
			pstmt = conn.prepareStatement(sql);
			//해당 sql문을 실행시킨다.
			rs = pstmt.executeQuery();
			
			if(rs.next()) {
				list = new ArrayList<BoardDataBean>();
				do {
					BoardDataBean bdb = new BoardDataBean();
					
					bdb.setSeqno(rs.getInt("seqno"));
					bdb.setTitle(rs.getString("title"));
					bdb.setWriter(rs.getString("writer"));
					bdb.setContent(rs.getString("content"));
					bdb.setRegdate(rs.getTimestamp("regdate"));
					
					list.add(bdb);
				} while (rs.next());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}finally {
			if(rs != null) try {rs.close();} catch (Exception e2) {}
			if(pstmt != null) try {pstmt.close();} catch (Exception e3) {}
			if(conn != null) try {conn.close();} catch (Exception e4) {}
		}
		return list;
	}
	
	public void boardDelete(int seqno)throws Exception{
		Connection conn = null;
		PreparedStatement pstmt = null;
		
		try {
			//커넥션 풀에서 커넥션을 리턴받아온다.
			conn = getConnection();
			//insert문을 작성해준다.
			String sql = "delete from testboard1 where seqno = ?";
			
			//커넥션에 해당 sql문을 넣어준다.
			pstmt = conn.prepareStatement(sql);
			//입력할 값들을 각각 설정해준다.
			pstmt.setInt(1,seqno);
			//해당 sql문을 실행시킨다.
			pstmt.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}finally {
			if(pstmt != null) try {pstmt.close();} catch (Exception e2) {}
			if(conn != null) try {conn.close();} catch (Exception e3) {}
		}
	}
	public void boardUpdate(BoardDataBean boardVO)throws Exception{
		Connection conn = null;
		PreparedStatement pstmt = null;
		
		try {
			//커넥션 풀에서 커넥션을 리턴받아온다.
			conn = getConnection();
			//insert문을 작성해준다.
			String sql = "update testboard1 set title = ?, writer = ?, content = ? where seqno = ?";
			
			//커넥션에 해당 sql문을 넣어준다.
			pstmt = conn.prepareStatement(sql);
			//입력할 값들을 각각 설정해준다.
			pstmt.setString(1, boardVO.getTitle());
			pstmt.setString(2, boardVO.getWriter());
			pstmt.setString(3, boardVO.getContent());
			pstmt.setInt(4,boardVO.getSeqno());
			//해당 sql문을 실행시킨다.
			pstmt.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}finally {
			if(pstmt != null) try {pstmt.close();} catch (Exception e2) {}
			if(conn != null) try {conn.close();} catch (Exception e3) {}
		}
	}
}
