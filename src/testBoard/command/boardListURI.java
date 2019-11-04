package testBoard.command;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import board.bean.BoardDBBean;

public class boardListURI implements CommandProcess {

	@Override
	public String requestPro(HttpServletRequest request, HttpServletResponse response) throws Throwable {
		
	  BoardDBBean bDBb = BoardDBBean.getInstance();
		  
	  request.setAttribute("allCount", bDBb.getAllBoardCount());
	  request.setAttribute("result", bDBb.getAllBoardData());
		 
		
	  return "/views/board/list.jsp";
	}

}
